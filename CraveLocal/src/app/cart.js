
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

import AppShell from '../components/AppShell';
import { useApp } from '../context/AppContext';

const DELIVERY_FEE = 2.99;

export default function CartScreen() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useApp();

  const total = subtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  function handleCheckout() {
    Alert.alert(
      'Order Ready!',
      'Your CraveLocal order is ready for checkout. Online ordering will be added in a future update.'
    );
  }

  return (
    <AppShell>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <Text style={styles.subtitle}>
            Review your meals before checking out.
          </Text>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Looks like you haven't added anything yet.
              Find something delicious to get started!
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.primaryButtonText}>
                Explore Restaurants
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.cartHeader}>
              <Text style={styles.sectionTitle}>
                Your Items ({cart.length})
              </Text>

              <Pressable onPress={clearCart}>
                <Text style={styles.clearText}>Clear Cart</Text>
              </Pressable>
            </View>

            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.mealIcon}>
                  <Text style={styles.mealEmoji}>🍽️</Text>
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>
                    {item.name}
                  </Text>

                  <Text style={styles.restaurantName}>
                    {item.restaurantName}
                  </Text>

                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.quantityText}>
                      {item.quantity}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.itemActions}>
                  <Text style={styles.lineTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>

                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <View style={styles.summary}>
              <Text style={styles.sectionTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ${subtotal.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  ${DELIVERY_FEE.toFixed(2)}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${total.toFixed(2)}
                </Text>
              </View>

              <Pressable
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>
                  Continue to Checkout
                </Text>
              </Pressable>

              <Pressable
                style={styles.continueButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.continueButtonText}>
                  Continue Exploring
                </Text>
              </Pressable>
            </View>
          </>
        )}
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
    fontSize: 29,
    fontWeight: '800',
    color: '#302820',
  },
  subtitle: {
    fontSize: 14,
    color: '#887C70',
    marginTop: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 30,
    marginTop: 25,
  },
  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#302820',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#887C70',
    textAlign: 'center',
    marginBottom: 22,
  },
  primaryButton: {
    backgroundColor: '#E76F32',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 13,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#302820',
  },
  clearText: {
    color: '#D9534F',
    fontWeight: '700',
    fontSize: 13,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 17,
    marginBottom: 12,
    alignItems: 'center',
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
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#302820',
    fontSize: 14,
    fontWeight: '800',
  },
  restaurantName: {
    color: '#887C70',
    fontSize: 11,
    marginTop: 3,
  },
  itemPrice: {
    color: '#E76F32',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 5,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 12,
  },
  quantityButton: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: '#FFF0E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E76F32',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#302820',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 3,
  },
  lineTotal: {
    color: '#302820',
    fontSize: 13,
    fontWeight: '800',
  },
  removeText: {
    color: '#D9534F',
    fontSize: 11,
    fontWeight: '700',
  },
  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 19,
    marginTop: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  summaryLabel: {
    color: '#887C70',
    fontSize: 14,
  },
  summaryValue: {
    color: '#302820',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E8DF',
    marginTop: 17,
  },
  totalLabel: {
    color: '#302820',
    fontSize: 17,
    fontWeight: '800',
  },
  totalValue: {
    color: '#E76F32',
    fontSize: 19,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: '#E76F32',
    borderRadius: 13,
    padding: 16,
    alignItems: 'center',
    marginTop: 22,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  continueButton: {
    alignItems: 'center',
    padding: 13,
    marginTop: 5,
  },
  continueButtonText: {
    color: '#887C70',
    fontSize: 13,
    fontWeight: '700',
  },
});
