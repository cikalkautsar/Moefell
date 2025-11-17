import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'ikhwan' | 'akhwat' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    // Validasi sederhana
    if (!nama || !email || !password || !gender) {
      Alert.alert('Error', 'Mohon lengkapi semua field');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter');
      return;
    }

    // Simulasi loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Langsung redirect ke home
      router.replace('/home');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Siapa Nama Anda ?"
        placeholderTextColor="#B5B7B1"
        value={nama}
        onChangeText={setNama}
      />
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Email Anda"
        placeholderTextColor="#B5B7B1"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Buat Password Kuat"
        placeholderTextColor="#B5B7B1"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      
      <Text style={styles.label}>Pilih Gender</Text>
      <View style={styles.genderRow}>
        <TouchableOpacity 
          style={styles.radioWrap} 
          onPress={() => setGender('ikhwan')}
        >
          <View style={[styles.radio, gender === 'ikhwan' && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Ikhwan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.radioWrap} 
          onPress={() => setGender('akhwat')}
        >
          <View style={[styles.radio, gender === 'akhwat' && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Akhwat</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.buttonWrapper} 
        onPress={handleRegister}
        disabled={loading}
      >
        <LinearGradient
          colors={['#637A60', '#B6E0B0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Daftar'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push('/login')} 
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Sudah punya akun? <Text style={styles.linkBold}>Masuk</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBE4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    marginBottom: 8,
    fontWeight: '500',
    color: '#5F6F5C',
    fontSize: 14,
    fontFamily: 'PoppinsBold',
  },
  input: {
    width: 270,
    backgroundColor: '#F6F7F0',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: '#637A60',
    borderWidth: 1,
    borderColor: '#292928',
    fontFamily: 'PoppinsRegular',
  },
  genderRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 6,
    width: 270,
    justifyContent: 'space-between',
  },
  radioWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#A6CEA2',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: '#A6CEA2',
    borderColor: '#6DA77C',
  },
  radioLabel: {
    fontSize: 16,
    color: '#5F6F5C',
    fontFamily: 'PoppinsRegular',
  },
  buttonWrapper: {
    width: 270,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
  linkContainer: {
    marginTop: 16,
  },
  linkText: {
    color: '#9EA0A3',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
  linkBold: {
    color: '#6DA77C',
    fontWeight: '600',
  },
});

export default register;
