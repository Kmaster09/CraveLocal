
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';

import AppShell from '../components/AppShell';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories } from '../data/restaurants';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationName, setLocationName] = useState('Your area');
  const [locationLoading, setLocationLoading] = useState(false);

  const filteredRestaurants =
    selectedCategory === 'all'
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === selectedCategory
        );

  async function getCurrentLocation() {
    try {
      setLocationLoading(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Location permission',
          'Location access was denied. You can still explore restaurants.'
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const addresses = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];

        const readableLocation =
          address.city ||
          address.district ||
          address.subregion ||
          address.region ||
          address.name ||
          'location found';

        setLocationName(readableLocation);
      } else {
        setLocationName('Location found');
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert(
        'Location unavailable',
        'We could not determine your location. Please try again.'
      );
    } finally {
      setLocationLoading(false);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <AppShell>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>GOOD FOOD, GOOD MOOD</Text>
            <Text style={styles.logo}>CraveLocal.</Text>
            <Text style={styles.subtitle}>
              What are you craving today?
            </Text>
          </View>

          <Pressable
            style={styles.locationBadge}
            onPress={getCurrentLocation}
            disabled={locationLoading}
          >
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>
              {locationLoading ? 'Finding...' : locationName}
            </Text>
            <Text style={styles.locationHint}>Tap to update</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.searchBox}
          onPress={() => router.push('/search')}
        >
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchPlaceholder}>
            Search restaurants or food...
          </Text>
          <Text style={styles.filterIcon}>☷</Text>
        </Pressable>

        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTag}>YOUR NEXT FAVORITE MEAL</Text>
            <Text style={styles.bannerTitle}>
              Good food is{'\n'}closer than you think.
            </Text>
            <Pressable
              style={styles.bannerButton}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.bannerButtonText}>Explore food</Text>
            </Pressable>
          </View>
          <Text style={styles.bannerEmoji}>🍔</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore categories</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const active = selectedCategory === category.id;

            return (
              <Pressable
                key={category.id}
                style={[
                  styles.category,
                  active && styles.categoryActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    active && styles.categoryNameActive,
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all'
                ? 'Popular near you'
                : `${selectedCategory} restaurants`}
            </Text>
            <Text style={styles.sectionSubtitle}>
              Find something delicious today
            </Text>
          </View>

          <Pressable onPress={() => router.push('/search')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {filteredRestaurants.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          >
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>
              No restaurants found in this category.
            </Text>
          </View>
        )}

        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>✨</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Something delicious awaits</Text>
            <Text style={styles.tipDescription}>
              Explore local restaurants and discover your next favorite meal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#E76F32',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#302820',
    marginTop: 4,
  },
  subtitle: {
    color: '#81766D',
    fontSize: 14,
    marginTop: 4,
  },
  locationBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    maxWidth: 125,
  },
  locationIcon: {
    fontSize: 18,
  },
  locationText: {
    fontSize: 10,
    color: '#81766D',
    marginTop: 3,
    textAlign: 'center',
    fontWeight: '700',
  },
  locationHint: {
    fontSize: 8,
    color: '#E76F32',
    marginTop: 3,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 52,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#F0E6DC',
  },
  searchIcon: {
    fontSize: 25,
    color: '#E76F32',
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: '#A49A91',
  },
  filterIcon: {
    fontSize: 23,
    color: '#E76F32',
  },
  banner: {
    backgroundColor: '#FCE3D2',
    borderRadius: 20,
    padding: 19,
    marginTop: 22,
    minHeight: 175,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerText: {
    flex: 1,
  },
  bannerTag: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#B95A2A',
  },
  bannerTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: 'bold',
    color: '#302820',
    marginTop: 9,
  },
  bannerButton: {
    backgroundColor: '#E76F32',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 13,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerEmoji: {
    fontSize: 75,
    marginLeft: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#302820',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94877D',
    marginTop: 4,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E76F32',
  },
  categoryList: {
    gap: 10,
    paddingVertical: 3,
  },
  category: {
    minWidth: 83,
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E6DC',
  },
  categoryActive: {
    backgroundColor: '#E76F32',
    borderColor: '#E76F32',
  },
  categoryEmoji: {
    fontSize: 23,
  },
  categoryName: {
    fontSize: 11,
    color: '#62574F',
    fontWeight: '600',
    marginTop: 5,
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  restaurantList: {
    paddingBottom: 5,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 35,
  },
  emptyText: {
    color: '#81766D',
    marginTop: 8,
    textAlign: 'center',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 30,
    marginRight: 13,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#302820',
  },
  tipDescription: {
    color: '#81766D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
});
