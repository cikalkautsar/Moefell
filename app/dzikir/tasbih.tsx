import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const STORAGE_KEY = '@last_dzikir_count';
const WEEK_KEY = '@dzikir_week_info';
const RECORD_KEY = '@dzikir_best_record';

// helper identitas minggu (tahun + nomor minggu)
function getCurrentWeekId() {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor((now.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const week = Math.ceil(dayOfYear / 7);
  return `${now.getFullYear()}-W${week}`;
}

const TasbihDigital: React.FC = () => {
  const [count, setCount] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [bestRecord, setBestRecord] = useState(0);
  const router = useRouter();

  // Load nilai terakhir, total minggu ini, dan rekor saat screen dibuka
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // count terakhir
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved != null) {
          setCount(Number(saved));
        }

        // info mingguan
        const currentWeek = getCurrentWeekId();
        const weekInfoRaw = await AsyncStorage.getItem(WEEK_KEY);

        if (weekInfoRaw) {
          const parsed = JSON.parse(weekInfoRaw) as { weekId: string; total: number };
          if (parsed.weekId === currentWeek) {
            setWeekId(parsed.weekId);
            setWeeklyTotal(parsed.total);
          } else {
            setWeekId(currentWeek);
            setWeeklyTotal(0);
          }
        } else {
          setWeekId(currentWeek);
          setWeeklyTotal(0);
        }

        // rekor tertinggi
        const recordRaw = await AsyncStorage.getItem(RECORD_KEY);
        if (recordRaw != null) {
          setBestRecord(Number(recordRaw));
        }
      } catch (e) {
        console.log('Gagal load dzikir tersimpan', e);
      }
    };
    loadSavedData();
  }, []);

  const handleTapCircle = () => {
    setCount(prev => prev + 1);
  };

  const handleSave = async () => {
    try {
      // simpan count terakhir
      await AsyncStorage.setItem(STORAGE_KEY, String(count));

      const currentWeek = getCurrentWeekId();
      let newTotal: number;

      if (weekId && weekId === currentWeek) {
        newTotal = weeklyTotal + count;
      } else {
        newTotal = count;
      }

      const weekInfo = {
        weekId: currentWeek,
        total: newTotal,
      };

      await AsyncStorage.setItem(WEEK_KEY, JSON.stringify(weekInfo));
      setWeekId(currentWeek);
      setWeeklyTotal(newTotal);

      // cek & update rekor
      if (count > bestRecord) {
        await AsyncStorage.setItem(RECORD_KEY, String(count));
        setBestRecord(count);
      }

      Alert.alert('Berhasil', 'Dzikir berhasil disimpan.');
    } catch (e) {
      Alert.alert('Gagal', 'Tidak bisa menyimpan dzikir.');
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Tasbih Digital</Text>

        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Ionicons name="home-outline" size={22} color="#5F6F5C" />
        </TouchableOpacity>
      </View>

      {/* Subjudul */}
      <Text style={styles.subtitle}>
        <Text style={styles.subtitleBold}>Tekan </Text>
        lingkaran untuk{'\n'}menghitung dzikir
      </Text>

      {/* Lingkaran hitung */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleTapCircle}
        onLongPress={handleReset}
        style={styles.circleWrapper}
      >
        <ImageBackground
          source={require('../../assets/images/Ellipse.png')}
          style={styles.circleImage}
          resizeMode="contain"
        >
          <Text style={styles.counterText}>{count}</Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* Tombol Simpan Dzikir */}
      <TouchableOpacity
        style={styles.saveButtonWrapper}
        activeOpacity={0.9}
        onPress={handleSave}
      >
        <LinearGradient
          colors={['#637A60', '#B6E0B0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Simpan Dzikir</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Card ringkasan minggu & rekor */}
      <View style={styles.cardsRow}>
        <View style={styles.summaryCard}>
          <Ionicons name="calendar-outline" size={18} color="#4F5F4D" />
          <Text style={styles.cardLabel}>Minggu ini :</Text>
          <Text style={styles.cardValue}>{weeklyTotal} Dzikir</Text>
        </View>

        <View style={styles.summaryCard}>
          <Ionicons name="trophy-outline" size={18} color="#4F5F4D" />
          <Text style={styles.cardLabel}>Rekor tertinggi :</Text>
          <Text style={styles.cardValue}>{bestRecord} Dzikir</Text>
        </View>
      </View>

      {/* Link cek riwayat */}
      <TouchableOpacity
        onPress={() => router.push('/riwayat-dzikir')}
        style={styles.historyLinkWrapper}
      >
        <Text style={styles.historyLinkText}>Cek Riwayat Dzikir {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TasbihDigital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBE4',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
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
  subtitleBold: {
    fontFamily: 'PoppinsSemiBold',
    fontWeight: '600',
  },

  circleWrapper: {
    alignSelf: 'center',
    marginBottom: 32,
  },

  circleImage: {
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterText: {
    fontSize: 60,
    fontWeight: '700',
    color: '#637A60',
    fontFamily: 'PoppinsBold',
  },

  saveButtonWrapper: {
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 13,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '80%',
  },
  saveButton: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'PoppinsRegular',
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6DFD4',
  },
  cardLabel: {
    fontSize: 12,
    color: '#4F5F4D',
    marginTop: 4,
    marginBottom: 2,
    fontFamily: 'PoppinsRegular',
  },
  cardValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F5F4D',
    fontFamily: 'PoppinsSemiBold',
  },

  historyLinkWrapper: {
    alignItems: 'center',
    marginTop: 4,
  },
  historyLinkText: {
    fontSize: 12,
    color: '#4F5F4D',
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsRegular',
  },
});
