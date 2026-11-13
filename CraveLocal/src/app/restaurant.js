

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import AppShell from '../components/AppShell';
import { restaurants } from '../data/restaurants';
import { useApp } from '../context/AppContext';

export default function RestaurantScreen() {
  const { restaurantId } = useLocalSearchParams();

  const restaurant = restaurants.find(
    (item) => item.id === restaurantId
  );

  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useApp();

  if (!restaurant) {
    return (
      <AppShell>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Restaurant not found
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.backButtonText}>
              Back to Home
            </Text>
          </Pressable>
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
        <Pressable
          style={styles.backLink}
          onPress={() => router.back()}
        >
          <Text style={styles.backLinkText}>
            ← Back
          </Text>
        </Pressable>

        {/* Restaurant food photograph */}
        <View style={styles.hero}>
          {restaurant.image ? (
            <Image
              source={restaurant.image}
              style={styles.heroImage}
              resizeMode="cover"
              accessibilityLabel={`${restaurant.name} food photograph`}
            />
          ) : (
            <Text style={styles.fallbackEmoji}>🍽️</Text>
          )}
        </View>

        {/* Restaurant information */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.name}>
            {restaurant.name}
          </Text>

          <Text style={styles.description}>
            {restaurant.description}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              ⭐ {restaurant.rating}
            </Text>

            <Text style={styles.infoText}>
              🕒 {restaurant.deliveryTime}
            </Text>

            <Text style={styles.infoText}>
              🚗 ${restaurant.deliveryFee.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>
            Our Menu
          </Text>

          <Text style={styles.menuSubtitle}>
            Choose something delicious!
          </Text>
        </View>

        {restaurant.meals.map((meal) => {
          const favorite = isFavorite(meal.id);

          return (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealEmojiBox}>
                <Text style={styles.mealEmoji}>
                  🍽️
                </Text>
              </View>

              <View style={styles.mealDetails}>
                <Text style={styles.mealName}>
                  {meal.name}
                </Text>

                <Text style={styles.mealDescription}>
                  {meal.description}
                </Text>

                <Text style={styles.mealPrice}>
                  ${meal.price.toFixed(2)}
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.addButton}
                    onPress={() => {
                      addToCart(meal, restaurant.name);

                      Alert.alert(
                        'Added to Cart!',
                        `${meal.name} has been added to your cart.`
                      );
                    }}
                  >
                    <Text style={styles.addButtonText}>
                      + Add to Cart
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.favoriteButton,
                      favorite && styles.favoriteActive,
                    ]}
                    onPress={() =>
                      toggleFavorite(meal, restaurant.name)
                    }
                  >
                    <Text style={styles.favoriteText}>
                      {favorite ? '♥ Saved' : '♡ Favorite'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}

        {/* Cart navigation */}
        <Pressable
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.cartButtonText}>
            View My Cart →
          </Text>
        </Pressable>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 35,
  },
  backLink: {
    marginBottom: 15,
  },
  backLinkText: {
    color: '#E76F32',
    fontSize: 15,
    fontWeight: '700',
  },
  hero: {
    height: 210,
    backgroundColor: '#FFF0E4',
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  fallbackEmoji: {
    fontSize: 75,
  },
  restaurantInfo: {
    marginTop: 18,
  },
  name: {
    fontSize: 25,
    fontWeight: '800',
    color: '#302820',
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#887C70',
    marginTop: 7,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 15,
  },
  infoText: {
    color: '#625548',
    fontSize: 12,
    fontWeight: '600',
  },
  menuHeader: {
    marginTop: 30,
    marginBottom: 15,
  },
  menuTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302820',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#887C70',
    marginTop: 4,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 13,
    marginBottom: 13,
  },
  mealEmojiBox: {
    width: 65,
    height: 65,
    borderRadius: 13,
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
    color: '#302820',
    fontSize: 15,
    fontWeight: '800',
  },
  mealDescription: {
    color: '#887C70',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  mealPrice: {
    color: '#E76F32',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 7,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#E76F32',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  favoriteButton: {
    backgroundColor: '#FFF0E4',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  favoriteActive: {
    backgroundColor: '#FCE0DC',
  },
  favoriteText: {
    color: '#D9534F',
    fontSize: 11,
    fontWeight: '800',
  },
  cartButton: {
    backgroundColor: '#302820',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 15,
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  notFoundTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302820',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#E76F32',
    padding: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
