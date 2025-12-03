// File: Doa.tsx (Sebelumnya DoaList.tsx)

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import doaData from '../../databases/doa.json';

const Doa = () => {
  const router = useRouter();

  const doas = (doaData as any).koleksi_doa || [];

  // Navigasi ke halaman detail doa (flow mirip dzikir: kirim title saja)
  const navigateToDoaDetail = (title: string) => {
    router.push({
      // File berada di app/doa/doaDetail.tsx → route: /doa/doaDetail
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
                    // Langsung arahkan ke home supaya pasti bekerja
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
                        style={styles.cardButton}
                        activeOpacity={0.8}
                        onPress={() => navigateToDoaDetail(doa.nama)}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>{doa.nama}</Text>
                            <Text style={styles.cardLink}>Baca Selengkapnya</Text>
                        </View>

                    </TouchableOpacity>
                ))}
                
                <View style={{ height: 50 }} />
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
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#5F6F5C',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cardButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D1E2C9', 
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 90,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    textContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5F6F5C',
        marginBottom: 4,
    },
    cardLink: {
        fontSize: 12,
        fontWeight: '500',
        color: '#5F6F5C',
    },
    cardImage: {
        width: 70, 
        height: 70, 
    }
});

export default Doa;