import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// DATA LIST DZIKIR PETANG (urutan mengikuti dzikir_petang di JSON)
const dzikirPetangList = [
  { id: 'ayat-kursi', title: 'Ayat Kursi', keyName: 'dzikir_petang', index: 0, total: 1 },
  { id: 'ikhlas-falaq-naas', title: 'Surah Al-Ikhlas, Al-Falaq, dan An-Naas', keyName: 'dzikir_petang', index: 1, total: 3 },
  { id: 'doa-sore', title: 'Doa Sore Hari', keyName: 'dzikir_petang', index: 2, total: 1 },
  { id: 'doa-perlindungan', title: 'Doa Perlindungan', keyName: 'dzikir_petang', index: 3, total: 3 },
  { id: 'sayyidul-istighfar', title: 'Sayyidul Istighfar', keyName: 'dzikir_petang', index: 4, total: 1 },
  { id: 'doa-ridho-allah', title: 'Doa Ridho Allah', keyName: 'dzikir_petang', index: 5, total: 3 },
];

type ItemType = (typeof dzikirPetangList)[number];

export default function DzikirPetang() {
  const router = useRouter();
  const [readStatus, setReadStatus] = useState<Record<string, boolean>>({});

  const handleBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace('/dzikir');
    }
  };

  // load status dari storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('dzikirPetangRead');
      if (saved) setReadStatus(JSON.parse(saved));
    })();
  }, []);

  // simpan ke storage
  const saveStatus = async (next: Record<string, boolean>) => {
    setReadStatus(next);
    await AsyncStorage.setItem('dzikirPetangRead', JSON.stringify(next));
  };

  const handleOpenDetail = (item: ItemType) => {
    const next = { ...readStatus, [item.id]: true };
    saveStatus(next);

    router.push({
      pathname: '/dzikir/dzikirDetail',
      params: {
        title: item.title,
        keyName: item.keyName,   // "dzikir_petang"
        index: String(item.index),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dzikir Petang</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LIST */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dzikirPetangList.map((item) => {
          const done = readStatus[item.id];

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.itemWrapper}
              activeOpacity={0.8}
              onPress={() => handleOpenDetail(item)}
            >
              <LinearGradient
                colors={['#7AA96B', '#4F7F4D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}   // horizontal gradient
                style={styles.item}
              >
                <Text style={styles.itemText}>{item.title}</Text>

                <View style={styles.rightSection}>
                  {item.total > 1 && (
                    <View style={styles.circle}>
                      <Text style={styles.circleText}>{item.total}</Text>
                    </View>
                  )}
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={done ? '#FFFFFF' : '#D5E8D1'}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EBE4' },
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
  content: { paddingHorizontal: 20 },
  itemWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  itemText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
