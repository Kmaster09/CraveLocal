
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);

const CART_KEY = 'cravelocal-cart';
const FAVORITES_KEY = 'cravelocal-favorites';

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart and favorites when the app starts.
  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedCart = await AsyncStorage.getItem(CART_KEY);
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }

        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadSavedData();
  }, []);

  // Save cart whenever it changes.
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart)).catch(
      (error) => console.error('Error saving cart:', error)
    );
  }, [cart, isLoaded]);

  // Save favorites whenever they change.
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    ).catch(
      (error) => console.error('Error saving favorites:', error)
    );
  }, [favorites, isLoaded]);

  function addToCart(meal, restaurantName) {
    setCart((currentCart) => {
      const existingMeal = currentCart.find(
        (item) => item.id === meal.id
      );

      if (existingMeal) {
        return currentCart.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...meal,
          restaurantName,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(mealId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === mealId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(mealId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === mealId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(mealId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== mealId)
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleFavorite(meal, restaurantName) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === meal.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.id !== meal.id
        );
      }

      return [
        ...currentFavorites,
        {
          ...meal,
          restaurantName,
        },
      ];
    });
  }

  function removeFavorite(mealId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== mealId)
    );
  }

  function isFavorite(mealId) {
    return favorites.some((item) => item.id === mealId);
  }

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const value = {
    cart,
    setCart,
    favorites,
    setFavorites,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    cartCount,
    subtotal,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
}
