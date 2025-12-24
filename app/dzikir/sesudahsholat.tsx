import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dzikirData from '../../databases/dzikir.json';

const dzikirSesudahSholat =
  dzikirData.kumpulan_dzikir?.dzikir_sesudah_sholat ?? [];

export default function SesudahSholat() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace('/dzikir');
    }
  };

  const getDzikirLabel = (index: number) => {
  const labels = ['Pertama', 'Kedua', 'Ketiga', 'Keempat', 'Kelima', 'Keenam'];
  return labels[index] ?? `Ke-${index + 1}`;
};


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Dzikir Sesudah Sholat</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* SEMUA DZIKIR DALAM SATU PAGE */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {dzikirSesudahSholat.map((item: any, index: number) => (
          <View key={index} style={styles.card}>
            {/* HEADER CARD GRADIENT */}
            <LinearGradient
              colors={['#7AA96B', '#4F7F4D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardHeader}
            >
            <Text style={styles.cardTitle}>
            {`Dzikir ${getDzikirLabel(index)}`}
            </Text>

              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </LinearGradient>

            {/* ISI DZIKIR */}
            <Text style={styles.sectionTitle}>{item.nama}</Text>

            <Text style={styles.arabic}>{item.arab}</Text>
            <Text style={styles.latin}>{item.latin}</Text>

            <Text style={styles.artiLabel}>Artinya:</Text>
            <Text style={styles.arti}>{item.terjemahan}</Text>

            <Text style={styles.keterangan}>{item.keterangan}</Text>
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

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
    paddingBottom: 16,
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
    color: '#5F6F5C',
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#F5F7F2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#B6CEA8',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'PoppinsSemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    color: '#5F6F5C',
    marginBottom: 8,
  },
  arabic: {
    fontFamily: 'PoppinsRegular',
    textAlign: 'right',
    fontSize: 20,
    lineHeight: 34,
    marginBottom: 12,
  },
  latin: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  artiLabel: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    marginTop: 6,
  },
  arti: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#555',
  },
  keterangan: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
