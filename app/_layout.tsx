import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import './globalfont'; 

// Prevent auto-hide splash
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
 
        if (loaded) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (loaded) {
          setAppIsReady(true);
          SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [loaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Stack 
      screenOptions={{ headerShown: false }}
      initialRouteName="welcome"  
    >
      <Stack.Screen name="welcome" />  
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
      <Stack.Screen name="dzikir" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="splashscreen" /> 
    </Stack>
  );
}
