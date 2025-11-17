import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome'); 
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.splashTitle}>Moeslim</Text>
      <Text style={styles.splashSubtitle}>Fellas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#E8EBE4', justifyContent: 'center', alignItems: 'center',
  },
  logo: { width: 140, height: 140, marginBottom: 20 },
  splashTitle: { fontSize: 28, fontWeight: '600', color: '#D4B896', letterSpacing: 1 },
  splashSubtitle: { fontSize: 28, fontWeight: '600', color: '#D4B896', letterSpacing: 1 },
});
export default SplashScreen;
