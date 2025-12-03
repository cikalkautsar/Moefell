// File: auth.js
import { auth, db } from "../firebase"; // Pastikan path ini benar
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// ERROR HANDLER
function formatFirebaseError(error: any): string {
  switch (error.code) {
    case "auth/email-already-in-use": 
      return "Email sudah digunakan. Gunakan email lain atau login.";
    case "auth/invalid-email": 
      return "Format email tidak valid.";
    case "auth/weak-password": 
      return "Password terlalu lemah (minimal 6 karakter).";
    case "auth/user-not-found": 
      return "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
    case "auth/wrong-password": 
      return "Password salah.";
    case "auth/invalid-credential":
      return "Email atau password salah.";
    case "auth/network-request-failed":
      return "Tidak ada koneksi internet. Cek WiFi/data Anda.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Tunggu beberapa menit.";
    default: 
      return error.message || "Terjadi kesalahan. Coba lagi.";
  }
}

// REGISTER
export async function register(email: string, password: string, name: string) {
  try {
    console.log('🔵 Starting register...');
    
    // Set timeout 10 detik
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), 10000);
    });
    
    const registerPromise = createUserWithEmailAndPassword(auth, email, password);
    
    const result = await Promise.race([registerPromise, timeoutPromise]) as any;
    
    console.log('✅ Register success:', result.user.uid);
    
    // Simpan data user ke Firestore agar bisa diambil di halaman home
    await setDoc(doc(db, "users", result.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
    });
    
    return result.user;
  } catch (error: any) {
    console.error('❌ Register error:', error);
    
    if (error.message === 'timeout') {
      throw new Error('Koneksi terlalu lambat. Coba lagi dengan internet lebih cepat.');
    }
    
    throw new Error(formatFirebaseError(error));
  }
}

// LOGIN
export async function login(email: string, password: string) {
  try {
    console.log('🔵 Starting login...');
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), 10000);
    });
    
    const loginPromise = signInWithEmailAndPassword(auth, email, password);
    
    const result = await Promise.race([loginPromise, timeoutPromise]) as any;
    
    console.log('✅ Login success:', result.user.uid);
    return result.user;
  } catch (error: any) {
    console.error('❌ Login error:', error);
    
    if (error.message === 'timeout') {
      throw new Error('Koneksi terlalu lambat. Coba lagi dengan internet lebih cepat.');
    }
    
    throw new Error(formatFirebaseError(error));
  }
}

// LOGOUT
export async function logout() {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(formatFirebaseError(error));
  }
}

// LISTEN AUTH STATE
export function listenAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// GET USER DATA
export async function getUser(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
}