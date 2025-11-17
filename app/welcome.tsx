import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to MoeFell !</Text>
      <TouchableOpacity 
        style={{ width: 250, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}
        onPress={() => router.push('/login')}
        >
        <LinearGradient
            colors={['#637A60', '#B6E0B0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 14, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ color: '#FBF5D1', fontWeight: '600', fontSize: 18, fontFamily: 'PoppinsBold' }}>Masuk</Text>
        </LinearGradient>
        </TouchableOpacity>

      <TouchableOpacity style={styles.buttonInactive} onPress={() => router.push('/register')}>
        <Text style={styles.buttonInactiveText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EBE4', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 150, height: 150, marginBottom: 50 },
  title: { fontSize: 18, fontFamily: 'PoppinsBold', fontWeight: '600', color: '#5F6F5C', marginBottom: 10, textAlign: 'center' },
  buttonActive: {
    width: 250, paddingVertical: 14, backgroundColor: '#A6CEA2',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, elevation: 2, shadowColor: '#333', shadowOpacity: 0.15, shadowRadius: 3,
  },
  buttonActiveText: { color: '#FBF5D1', fontWeight: '600', fontSize: 18, fontFamily: 'PoppinsBold', },
  buttonInactive: {
    width: 250, paddingVertical: 14, backgroundColor: '#D9D9D9',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  buttonInactiveText: { color: '#9EA0A3', fontWeight: '600', fontSize: 18, fontFamily: 'PoppinsBold', }
});
export default Welcome;
