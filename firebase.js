import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMuJ3CHtBLxHHlyUBJTRTa4nOfJwdI1JU",
  authDomain: "moefell.firebaseapp.com",
  projectId: "moefell",
  storageBucket: "moefell.firebasestorage.app",
  messagingSenderId: "376412731431",
  appId: "1:376412731431:web:1728149420ad582f1b7602",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
