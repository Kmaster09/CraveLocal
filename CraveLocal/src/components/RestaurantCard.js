
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { router } from 'expo-router';

export default function RestaurantCard({ restaurant }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/restaurant',
          params: { restaurantId: restaurant.id },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={restaurant.image}
          style={styles.image}
          resizeMode="cover"
        />

        {restaurant.featured && (
          <Text style={styles.featured}>POPULAR</Text>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{restaurant.name}</Text>

        <Text style={styles.description} numberOfLines={1}>
          {restaurant.description}
        </Text>

        <View style={styles.info}>
          <Text style={styles.rating}>★ {restaurant.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.delivery}>
            {restaurant.deliveryTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 245,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 15,
    marginBottom: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 145,
    backgroundColor: '#FCE7D8',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featured: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E76F32',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  details: {
    padding: 13,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#302820',
  },
  description: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },
  rating: {
    color: '#E76F32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dot: {
    marginHorizontal: 7,
    color: '#AAAAAA',
  },
  delivery: {
    color: '#777777',
    fontSize: 12,
  },
});
