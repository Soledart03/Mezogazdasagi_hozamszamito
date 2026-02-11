import { Tabs } from 'expo-router';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'MEHOSZ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fold"
        options={{
          title: 'Földek',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="table" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kiad"
        options={{
          title: 'Kiadás',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="dollar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="terv"
        options={{
          title: 'Tervek',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="schedule" color={color} />,
        }}
      />
    </Tabs>
  );
}
