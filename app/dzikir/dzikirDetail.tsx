import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dzikirData from '../../databases/dzikir.json';

export default function DzikirDetail() {
  const router = useRouter();
  const { title, keyName } = useLocalSearchParams<{
    title: string;
    keyName: string;
  }>();

  const dzikirList =
    dzikirData.kumpulan_dzikir &&
    keyName &&
    dzikirData.kumpulan_dzikir[keyName as keyof typeof dzikirData.kumpulan_dzikir]
      ? dzikirData.kumpulan_dzikir[keyName as keyof typeof dzikirData.kumpulan_dzikir]
      : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {dzikirList.map((item: any, index: number) => (
          <View key={index} style={styles.card}>

            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nama}</Text>
            </View>

            <Text style={styles.arabic}>{item.arab}</Text>
            <Text style={styles.latin}>{item.latin}</Text>

            <Text style={styles.artiLabel}>Artinya:</Text>
            <Text style={styles.arti}>{item.terjemahan}</Text>

            {item.keterangan ? (
              <Text style={styles.keterangan}>{item.keterangan}</Text>
            ) : null}
          </View>
        ))}
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
    color: '#5F6F5C',
  },

  content: {
    paddingHorizontal: 20,
  },

  /* Card */
  card: {
    backgroundColor: '#F5F7F2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#B6CEA8'
  },

  cardHeader: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#7AA96B',
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },

  cardTitle: {
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    fontSize: 14,
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
    marginBottom: 10,
    color: '#555',
  },
  keterangan: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
