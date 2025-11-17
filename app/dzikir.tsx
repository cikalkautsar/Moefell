import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dzikir = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pilih Dzikir</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Pilihlah dzikir sesuai waktu dan kebutuhan kamu.
        </Text>

        {/* Button - Dzikir Sesudah Solat */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => console.log('Dzikir Sesudah Solat')}
        >
          <Text style={styles.buttonText}>Dzikir Sesudah Solat</Text>
        </TouchableOpacity>

        {/* Button - Dzikir Pagi */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => console.log('Dzikir Pagi')}
        >
          <Text style={styles.buttonText}>Dzikir Pagi</Text>
        </TouchableOpacity>

        {/* Button - Dzikir Petang */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => console.log('Dzikir Petang')}
        >
          <Text style={styles.buttonText}>Dzikir Petang</Text>
        </TouchableOpacity>

        {/* Button Tasbih Digital dengan Gradient */}
        <TouchableOpacity 
          style={styles.tasbihWrapper}
          activeOpacity={0.8}
          onPress={() => console.log('Tasbih Digital')}
        >
          <LinearGradient
            colors={['#637A60', '#B6E0B0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tasbihGradient}
          >
            <Text style={styles.tasbihText}>Tasbih Digital</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBE4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#E8EBE4',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#5F6F5C',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    fontWeight: '400',
    color: '#9EA0A3',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    lineHeight: 20,
  },
  button: {
    width: '100%',
    height: 100,
    paddingVertical: 16,
    backgroundColor: '#E8EBE4',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#B6CEA8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  buttonText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
    fontWeight: '500',
    color: '#5F6F5C',
  },
  tasbihWrapper: {
    width: '60%',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 40,
    left: 69,
    top: 30,
  },
  tasbihGradient: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasbihText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default dzikir;
