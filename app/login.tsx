import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Platform  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {

    if (!email || !password) {
      Alert.alert('Error', 'Mohon isi email dan password');
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

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      router.replace('/home');
    }, 500);
  };


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Email"
        placeholderTextColor="#B5B7B1"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password"
        placeholderTextColor="#B5B7B1"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Lupa Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 270, borderRadius: 10, overflow: 'hidden', marginTop: 12 }}>
        <LinearGradient
            colors={['#637A60', '#B6E0B0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 14, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18, fontFamily: 'PoppinsBold' }}>Masuk</Text>
        </LinearGradient>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EBE4', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 140, height: 140, marginBottom: 24 },
  label: { alignSelf: 'flex-start', marginLeft: 80, fontWeight: '500', color: '#637A60', fontFamily: 'PoppinsBold' },
  input: {
    width: 270, backgroundColor: '#F6F7F0', borderRadius: 8, fontSize: 16,
    paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, color: '#3F3F3F',
    borderWidth: 1, borderColor: '#292928ff', fontFamily: 'PoppinsRegular',
  },
  forgotContainer: { width: 270, alignItems: 'flex-end', marginBottom: 16 },
  forgotText: { color: '#9EA0A3', fontSize: 13, fontWeight: '500', fontFamily: 'PoppinsRegular' },
  buttonActive: {
    width: 270, paddingVertical: 14, backgroundColor: '#A6CEA2',
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    marginTop: 12, elevation: 2, shadowColor: '#333', shadowOpacity: 0.12, shadowRadius: 3,
  },
  buttonActiveText: { color: '#fff', fontWeight: '600', fontSize: 18 }
});
export default login;
