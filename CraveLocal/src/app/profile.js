
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppShell from '../components/AppShell';

const PROFILE_KEY = 'cravelocal-user-profile';

export default function ProfileScreen() {
  const [name, setName] = useState('CraveLocal User');
  const [email, setEmail] = useState('foodlover@example.com');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setName(profile.name || 'CraveLocal User');
          setEmail(profile.email || 'foodlover@example.com');
        }
      } catch (error) {
        Alert.alert('Error', 'Could not load your saved profile.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function saveProfile() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing information', 'Please enter your name and email.');
      return;
    }

    try {
      const profile = {
        name: name.trim(),
        email: email.trim(),
      };

      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setName(profile.name);
      setEmail(profile.email);
      setEditing(false);

      Alert.alert('Profile updated', 'Your information has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Your profile could not be saved.');
    }
  }

  if (loading) {
    return (
      <AppShell>
        <View style={styles.loadingContainer}>
          <Text style={styles.subtitle}>Loading your profile...</Text>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your CraveLocal account.
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          {editing ? (
            <>
              <Text style={styles.fieldLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />

              <Text style={styles.fieldLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Pressable style={styles.primaryButton} onPress={saveProfile}>
                <Text style={styles.primaryButtonText}>Save Changes</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>

              <Pressable
                style={styles.primaryButton}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.primaryButtonText}>Edit Profile</Text>
              </Pressable>
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>📍</Text>
            <View style={styles.settingDetails}>
              <Text style={styles.settingTitle}>Delivery Address</Text>
              <Text style={styles.settingDescription}>
                Manage your delivery location
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>🔔</Text>
            <View style={styles.settingDetails}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Stay updated on your orders
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>🔒</Text>
            <View style={styles.settingDetails}>
              <Text style={styles.settingTitle}>Privacy</Text>
              <Text style={styles.settingDescription}>
                Your account and information
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About CraveLocal</Text>
          <Text style={styles.aboutText}>
            Discover local restaurants, explore delicious meals,
            and keep all your favorite foods in one place.
          </Text>
          <Text style={styles.version}>CraveLocal · Version 1.0.0</Text>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 35,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#302820',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B8178',
    marginTop: 5,
    marginBottom: 22,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 2,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFF0E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  avatarText: {
    fontSize: 39,
  },
  name: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302820',
  },
  email: {
    fontSize: 14,
    color: '#8B8178',
    marginTop: 5,
    marginBottom: 17,
  },
  fieldLabel: {
    alignSelf: 'flex-start',
    color: '#302820',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF9F2',
    borderWidth: 1,
    borderColor: '#EADFD4',
    borderRadius: 11,
    padding: 12,
    fontSize: 15,
    color: '#302820',
  },
  primaryButton: {
    backgroundColor: '#E76F32',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 17,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  cancelButton: {
    padding: 10,
    marginTop: 5,
  },
  cancelButtonText: {
    color: '#8B8178',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#302820',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
  },
  settingIcon: {
    fontSize: 23,
    marginRight: 13,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#302820',
  },
  settingDescription: {
    fontSize: 12,
    color: '#8B8178',
    marginTop: 4,
  },
  arrow: {
    fontSize: 25,
    color: '#B4A79B',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0E8E0',
  },
  aboutCard: {
    backgroundColor: '#FFF0E5',
    borderRadius: 17,
    padding: 18,
  },
  aboutTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#302820',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#75675B',
  },
  version: {
    fontSize: 11,
    color: '#A18F80',
    marginTop: 13,
  },
});
