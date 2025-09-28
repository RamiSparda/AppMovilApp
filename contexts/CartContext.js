import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context del carrito
const CartContext = createContext();

// Tipos de acciones para el reducer
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      
      // Crear un ID único para el item basado en producto, color y talla
      const itemId = `${product.id}_${selectedColor || 'default'}_${selectedSize || 'default'}`;
      
      // Verificar si el item ya existe
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Si existe, actualizar cantidad
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        const newItem = {
          id: itemId,
          productId: product.id,
          name: product.Nombre || product.name,
          price: product.precio || product.price,
          image: product.img || product.image,
          quantity,
          selectedColor: selectedColor || 'Sin especificar',
          selectedSize: selectedSize || 'Sin especificar',
        };
        newItems = [...state.items, newItem];
      }
      
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el item
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: { itemId } });
      }
      
      const newItems = state.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return initialState;
    }
    
    case CART_ACTIONS.LOAD_CART: {
      const items = action.payload || [];
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        items,
        totalItems,
        totalPrice,
      };
    }
    
    default:
      return state;
  }
};

// Provider del contexto del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Cargar carrito desde AsyncStorage al inicializar
  useEffect(() => {
    loadCartFromStorage();
  }, []);
  
  // Guardar carrito en AsyncStorage cuando cambie
  useEffect(() => {
    saveCartToStorage();
  }, [state.items]);
  
  const loadCartFromStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem('@cart');
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };
  
  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };
  
  // Funciones del carrito
  const addToCart = (product, quantity = 1, selectedColor, selectedSize) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedColor, selectedSize }
    });
  };
  
  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  };
  
  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };
  
  const isInCart = (productId, selectedColor, selectedSize) => {
    const itemId = `${productId}_${selectedColor || 'default'}_${selectedSize || 'default'}`;
    return state.items.some(item => item.id === itemId);
  };
  
  const getItemQuantity = (productId, selectedColor, selectedSize) => {
    const itemId = `${productId}_${selectedColor || 'default'}_${selectedSize || 'default'}`;
    const item = state.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const value = {
    // Estado
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};