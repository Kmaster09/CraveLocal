
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';

const tabs = [
  { label: 'Home', icon: '⌂', path: '/' },
  { label: 'Search', icon: '⌕', path: '/search' },
  { label: 'Cart', icon: '🛒', path: '/cart' },
  { label: 'Favorites', icon: '♡', path: '/favorites' },
  { label: 'Profile', icon: '☺', path: '/profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = pathname === tab.path;

        return (
          <Pressable
            key={tab.path}
            style={styles.tab}
            onPress={() => router.push(tab.path)}
          >
            <Text style={[styles.icon, active && styles.activeText]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, active && styles.activeText]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0E8E0',
    paddingTop: 10,
    paddingBottom: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 23,
    color: '#999999',
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500',
  },
  activeText: {
    color: '#E76F32',
    fontWeight: 'bold',
  },
});

