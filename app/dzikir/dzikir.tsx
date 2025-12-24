import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextStyle, 
  ViewStyle 
} from 'react-native';

const Dzikir: React.FC = () => {
  const router = useRouter();


  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/home')}
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
 
        <Text style={styles.subtitle}>
          Pilihlah dzikir sesuai waktu dan kebutuhan kamu.
        </Text>

        {/* Dzikir Sesudah Sholat */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => router.push('/dzikir/sesudahsholat')}
        >
          <Text style={styles.buttonText}>Dzikir Sesudah Sholat</Text>
        </TouchableOpacity>

        {/* Dzikir Pagi */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => router.push('/dzikir/pagi')}   // BUAT SCREEN BARU
        >
          <Text style={styles.buttonText}>Dzikir Pagi</Text>
        </TouchableOpacity>

        {/* Dzikir Petang */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={() =>  router.push('/dzikir/petang')}
        >
          <Text style={styles.buttonText}>Dzikir Petang</Text>
        </TouchableOpacity>

        {/* Tasbih Digital */}
        <TouchableOpacity 
          style={styles.tasbihWrapper}
          activeOpacity={0.8}
          onPress={() => router.push('/dzikir/tasbih')}
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

// TypeScript types
interface Style {
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  headerTitle: TextStyle;
  content: ViewStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  tasbihWrapper: ViewStyle;
  tasbihGradient: ViewStyle;
  tasbihText: TextStyle;
}

const styles = StyleSheet.create<Style>({
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
    fontSize: 18,
    fontWeight: '600',
    color: '#5F6F5C',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
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
  },
  tasbihGradient: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasbihText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Dzikir;
