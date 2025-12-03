// File: DoaDetail.tsx

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import database JSON doa
import doaData from '../../databases/doa.json';

const DoaDetail = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title?: string }>();

  const doaDataFound = useMemo(() => {
    if (!title) return undefined;

    const doaList = (doaData as any).koleksi_doa || [];

    // Cari doa yang 'nama' field-nya cocok dengan 'title' dari parameter navigasi
    return doaList.find((doa: any) => doa.nama === title);
  }, [title]);


    // Jika data tidak ditemukan
    if (!doaDataFound) {
        return (
            <View style={[detailStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={detailStyles.headerTitle}>Doa tidak ditemukan.</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ marginTop: 20, color: '#5F6F5C' }}>Kembali</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={detailStyles.container}>
            {/* Header Doa */}
            <View style={detailStyles.header}>
                <TouchableOpacity 
                    style={detailStyles.backButton} 
                    // Kembali ke list doa secara eksplisit
                    onPress={() => router.push('/doa/doa')}
                >
                    <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
                </TouchableOpacity>
                <Text style={detailStyles.headerTitle}>{title || 'Detail Doa'}</Text>
                {/* Tombol Home */}
                <TouchableOpacity 
                    style={detailStyles.homeButton}
                    onPress={() => router.push('/home')}
                >
                    <Ionicons name="home-outline" size={24} color="#5F6F5C" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={detailStyles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={detailStyles.scrollContent}
            >
                <View style={detailStyles.textContainer}>
                    {/* Teks Arab */}
                    <Text style={detailStyles.arabicText}>{doaDataFound.arab}</Text>
                    
                    {/* Teks Latin (Opsional) */}
                    {doaDataFound.latin && (
                        <>
                            <Text style={detailStyles.latinLabel}>Transliterasi:</Text>
                            <Text style={detailStyles.latinText}>{doaDataFound.latin}</Text>
                        </>
                    )}

                    {/* Teks Terjemahan/Arti */}
                    <Text style={detailStyles.meaningLabel}>Artinya:</Text>
                    <Text style={detailStyles.meaningText}>{doaDataFound.terjemahan}</Text>
                </View>

                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
};

const detailStyles = StyleSheet.create({
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
        backgroundColor: '#D1E2C9', 
    },
    backButton: {
        padding: 5,
    },
    homeButton: {
        padding: 5,
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
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },
    // Ilustrasi
    illustrationContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF', 
        padding: 20,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 1,
    },
    illustration: {
        width: '80%', 
        height: 180, 
    },
    // Styling untuk container teks doa
    textContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    arabicText: {
        fontSize: 24,
        textAlign: 'right',
        lineHeight: 45,
        color: '#333',
        marginBottom: 15,
        fontWeight: '500',
    },
    meaningLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5F6F5C',
        marginTop: 15,
        marginBottom: 5,
    },
    meaningText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#3F3F3F',
    },
    latinLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9EA0A3',
        marginTop: 10,
        marginBottom: 5,
    },
    latinText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777',
        marginBottom: 10,
    },
    keteranganText: {
        fontSize: 12,
        color: '#777',
        marginTop: 10,
        textAlign: 'right',
    }
});

export default DoaDetail;