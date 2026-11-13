
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

import AppShell from '../components/AppShell';
import { restaurants } from '../data/restaurants';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const results = restaurants.filter((restaurant) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    return (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.category.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query) ||
      restaurant.meals.some(
        (meal) =>
          meal.name.toLowerCase().includes(query) ||
          meal.description.toLowerCase().includes(query)
      )
    );
  });

  return (
    <AppShell>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.heading}>Search</Text>
        <Text style={styles.subtitle}>
          Find your next favorite meal.
        </Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.input}
            placeholder="Restaurants, meals, or categories..."
            placeholderTextColor="#A49A91"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Text style={styles.clearButton}>✕</Text>
            </Pressable>
          )}
        </View>

        {!searchQuery.trim() ? (
          <View style={styles.messageBox}>
            <Text style={styles.messageEmoji}>🍽️</Text>
            <Text style={styles.messageTitle}>
              What sounds good today?
            </Text>
            <Text style={styles.messageText}>
              Search for a restaurant, food, or category to get started.
            </Text>
          </View>
        ) : results.length > 0 ? (
          <View style={styles.resultsSection}>
            <Text style={styles.resultCount}>
              {results.length} restaurant{results.length === 1 ? '' : 's'} found
            </Text>

            {results.map((restaurant) => (
              <Pressable
                key={restaurant.id}
                style={styles.resultCard}
                onPress={() =>
                  router.push({
                    pathname: '/restaurant',
                    params: { restaurantId: restaurant.id },
                  })
                }
              >
                <View style={styles.foodImage}>
                  <Text style={styles.foodEmoji}>
                    {restaurant.category === 'Burgers' ? '🍔' :
                     restaurant.category === 'Italian' ? '🍝' :
                     restaurant.category === 'Healthy' ? '🥗' : '🍜'}
                  </Text>
                </View>

                <View style={styles.resultDetails}>
                  <Text style={styles.restaurantName}>
                    {restaurant.name}
                  </Text>
                  <Text style={styles.description}>
                    {restaurant.category}
                  </Text>
                  <Text style={styles.rating}>
                    ★ {restaurant.rating} · {restaurant.deliveryTime}
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.messageBox}>
            <Text style={styles.messageEmoji}>🔎</Text>
            <Text style={styles.messageTitle}>No results found</Text>
            <Text style={styles.messageText}>
              Try another restaurant, meal, or category.
            </Text>
          </View>
        )}
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#302820',
  },
  subtitle: {
    fontSize: 15,
    color: '#81766D',
    marginTop: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#F0E6DC',
  },
  searchIcon: {
    fontSize: 25,
    color: '#E76F32',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#302820',
    outlineStyle: 'none',
  },
  clearButton: {
    color: '#E76F32',
    fontSize: 18,
    padding: 5,
  },
  messageBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginTop: 35,
  },
  messageEmoji: {
    fontSize: 45,
    marginBottom: 12,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#302820',
  },
  messageText: {
    fontSize: 13,
    color: '#81766D',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  resultsSection: {
    marginTop: 25,
  },
  resultCount: {
    fontSize: 14,
    color: '#81766D',
    marginBottom: 13,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  foodImage: {
    width: 65,
    height: 65,
    borderRadius: 13,
    backgroundColor: '#FCE7D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 34,
  },
  resultDetails: {
    flex: 1,
    marginLeft: 13,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#302820',
  },
  description: {
    fontSize: 12,
    color: '#81766D',
    marginTop: 4,
  },
  rating: {
    fontSize: 11,
    color: '#E76F32',
    marginTop: 6,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 25,
    color: '#E76F32',
    paddingHorizontal: 5,
  },
});
