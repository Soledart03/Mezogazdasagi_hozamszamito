import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const id = await AsyncStorage.getItem('gazda_id');
      setIsLoggedIn(!!id);
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) return null; // várunk

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="login" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
