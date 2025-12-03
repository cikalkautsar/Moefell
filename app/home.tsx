import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore
import moment from 'moment-hijri';
import { listenAuth, getUser } from '../backend/auth';

const home = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState({
    dayName: '',
    hijriDate: '',
  });
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    updateDate();
    const interval = setInterval(() => {
      updateDate();
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  const updateDate = () => {
    const now = moment();

    const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = dayNames[now.day()];

    const hijriDay = now.iDate();
    const hijriMonthNumber = now.iMonth(); 
    const hijriYear = now.iYear();
    
    const hijriMonths = [
      'Muharam',
      'Safar',
      'Rabiul Awal',
      'Rabiul Akhir',
      'Jumadil Awal',
      'Jumadil Akhir',
      'Rajab',
      "Sya'ban",
      'Ramadan',
      'Syawal',
      'Zulkaidah',
      'Zulhijah'
    ];
    
    const hijriMonthName = hijriMonths[hijriMonthNumber];
    
    setCurrentDate({
      dayName,
      hijriDate: `${hijriDay} ${hijriMonthName} ${hijriYear} H`,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/header-bg.png')}
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.dateLabel}>{currentDate.dayName}</Text>
        <Text style={styles.dateText}>{currentDate.hijriDate}</Text>
      </ImageBackground>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.greetingSection}>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingText}>Assalamualaikum </Text>
          </View>
          <Text style={styles.subGreeting}>
            Sudahkah kamu Berdzikir & Berdoa Hari ini ?
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/dzikir')} 
        >
          <Image 
            source={require('../assets/images/dzikir.jpg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(99, 122, 96, 0)', 'rgba(99, 122, 96, 0.7)', 'rgba(99, 122, 96, 0.95)']}
            locations={[0, 1, 1]}
            style={styles.gradientOverlay}
          >
            <Text style={styles.cardLabel}>Dzikir</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/doa')} 
        >
          <Image 
            source={require('../assets/images/doa.jpg')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(99, 122, 96, 0)', 'rgba(99, 122, 96, 0.7)', 'rgba(99, 122, 96, 0.95)']}
            locations={[0, 1, 1]}
            style={styles.gradientOverlay}
          >
            <Text style={styles.cardLabelDoa}>Doa</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity 
        style={styles.profileButton}
        activeOpacity={0.8}
        onPress={() => router.push('/chatbot')} 
      >
        <Image 
          source={require('../assets/images/chatbot.png')}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF7EE',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingTop: 50,
    minHeight: 210,
    justifyContent: 'center',
  },
  dateLabel: {
    fontFamily: 'PoppinsBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  dateText: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greetingSection: {
    marginTop: 50,
    marginBottom: 24,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  greetingText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
    color: '#5F6F5C',
    left: 15,
  },
  greetingName: {
    fontFamily: 'PoppinsItalic',
    fontSize: 18,
    color: '#5F6F5C',
    left: 15,
  },
  subGreeting: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 13,
    color: '#9EA0A3',
    marginTop: 2,
    left: 15,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderWidth: 5,
    borderColor: '#5F6F5C',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardLabel: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardLabelDoa: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    alignSelf: 'flex-end',
  },
  profileButton: {
    position: 'absolute',
    bottom: 50,
    right: 33,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 27,
  },
});

export default home;
