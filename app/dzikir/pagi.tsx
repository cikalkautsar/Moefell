import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dzikirPagiList = [
  { id: 'ayat-kursi', title: 'Ayat Kursi', keyName: 'dzikir_pagi', index: 0, total: 1 },
  { id: 'ikhlas-falaq-naas', title: 'Surah Al-Ikhlas, Al-Falaq, dan An-Naas', keyName: 'dzikir_pagi', index: 1, total: 3 },
  { id: 'sayyidul-istighfar', title: 'Sayyidul Istighfar', keyName: 'dzikir_pagi', index: 2, total: 1 },
  { id: 'doa-keberkahan', title: 'Doa Mohon Keberkahan Pagi', keyName: 'dzikir_pagi', index: 3, total: 1 },
  { id: 'doa-ridho-allah', title: 'Doa Ridho Allah', keyName: 'dzikir_pagi', index: 4, total: 1 },
  { id: 'dzikir-tasbih', title: 'Dzikir tasbih', keyName: 'dzikir_pagi', index: 5, total: 1 },
  { id: 'dzikir-tauhid', title: 'Dzikir tauhid', keyName: 'dzikir_pagi', index: 6, total: 1 },
];

type ItemType = (typeof dzikirPagiList)[number];

export default function DzikirPagi() {
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
      const saved = await AsyncStorage.getItem('dzikirPagiRead');
      if (saved) setReadStatus(JSON.parse(saved));
    })();
  }, []);

  // simpan ke storage
  const saveStatus = async (next: Record<string, boolean>) => {
    setReadStatus(next);
    await AsyncStorage.setItem('dzikirPagiRead', JSON.stringify(next));
  };

  const handleOpenDetail = (item: ItemType) => {
    const next = { ...readStatus, [item.id]: true };
    saveStatus(next);

    router.push({
      pathname: '/dzikir/dzikirDetail',
      params: {
        title: item.title,
        keyName: item.keyName,
        index: String(item.index),
      },
    });
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

        <Text style={styles.headerTitle}>Dzikir pagi</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LIST */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {dzikirPagiList.map((item) => {
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
                end={{ x: 1, y: 0 }}
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
