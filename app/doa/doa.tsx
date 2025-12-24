// app/doa/Doa.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import doaData from '../../databases/doa.json';

// Sesuaikan path dengan lokasi PNG kamu
const images = [
require('../../assets/images/burger.png'),
require('../../assets/images/rain.png'),
require('../../assets/images/suitcase.png'), 
require('../../assets/images/sleep.png'),
];

const Doa = () => {
  const router = useRouter();
  const doas = (doaData as any).koleksi_doa || [];

  const navigateToDoaDetail = (title: string) => {
    router.push({
      pathname: '/doa/doaDetail',
      params: { title },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Koleksi Doa</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {doas.map((doa: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.cardWrapper}
            activeOpacity={0.85}
            onPress={() => navigateToDoaDetail(doa.nama)}
          >
            <LinearGradient
              colors={['#7AA96B', '#4F7F4D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
            >
              {/* kiri: teks */}
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{doa.nama}</Text>

                <View style={styles.readMoreButton}>
                  <Text style={styles.readMoreText}>Baca Selengkapnya &gt;</Text>
                </View>
              </View>

              {/* kanan: icon sesuai urutan */}
              {images[index] && (
                <Image
                  source={images[index]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
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
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#5F6F5C',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 18,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  readMoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F6F5C',
  },
  cardImage: {
    width: 72,
    height: 72,
    marginLeft: 12,
  },
});

export default Doa;
