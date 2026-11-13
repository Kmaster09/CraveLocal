
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

import AppShell from '../components/AppShell';
import { useApp } from '../context/AppContext';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useApp();

  return (
    <AppShell>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Favorites ♥</Text>
          <Text style={styles.subtitle}>
            All the meals you love, in one place.
          </Text>
        </View>

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>♡</Text>

            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>

            <Text style={styles.emptyText}>
              When you find a meal you love, tap the
              favorite button and it will appear here.
            </Text>

            <Pressable
              style={styles.exploreButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.exploreButtonText}>
                Explore Restaurants
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.countText}>
              {favorites.length} saved meal
              {favorites.length === 1 ? '' : 's'}
            </Text>

            {favorites.map((meal) => (
              <View key={meal.id} style={styles.favoriteCard}>
                <View style={styles.mealIcon}>
                  <Text style={styles.mealEmoji}>🍽️</Text>
                </View>

                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>
                    {meal.name}
                  </Text>

                  <Text style={styles.restaurantName}>
                    {meal.restaurantName}
                  </Text>

                  <Text style={styles.mealPrice}>
                    ${meal.price.toFixed(2)}
                  </Text>
                </View>

                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeFavorite(meal.id)}
                >
                  <Text style={styles.heartIcon}>♥</Text>
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </>
        )}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>CraveLocal Tip</Text>
          <Text style={styles.tipText}>
            Save your favorite meals so you can find
            them quickly the next time you're hungry!
          </Text>
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
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#302820',
  },
  subtitle: {
    fontSize: 14,
    color: '#887C70',
    marginTop: 6,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    marginTop: 15,
  },
  emptyIcon: {
    fontSize: 65,
    color: '#E76F32',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302820',
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#887C70',
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 22,
  },
  exploreButton: {
    backgroundColor: '#E76F32',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 13,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  countText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#887C70',
    marginBottom: 14,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 17,
    marginBottom: 13,
  },
  mealIcon: {
    width: 65,
    height: 65,
    borderRadius: 14,
    backgroundColor: '#FFF0E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealEmoji: {
    fontSize: 30,
  },
  mealDetails: {
    flex: 1,
    marginLeft: 12,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#302820',
  },
  restaurantName: {
    fontSize: 12,
    color: '#887C70',
    marginTop: 4,
  },
  mealPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E76F32',
    marginTop: 6,
  },
  removeButton: {
    alignItems: 'center',
    paddingLeft: 8,
  },
  heartIcon: {
    fontSize: 21,
    color: '#E76F32',
  },
  removeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D9534F',
    marginTop: 3,
  },
  tipCard: {
    backgroundColor: '#FFF0E4',
    padding: 18,
    borderRadius: 17,
    marginTop: 18,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#302820',
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#887C70',
    marginTop: 6,
  },
});
