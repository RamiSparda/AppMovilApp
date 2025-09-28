import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext.js';

// Mapeo de imágenes locales
const productImages = {
  'Sudadera Relaxed-fix.png': require('../assets/products/Sudadera Relaxed-fix.png'),
  'jogger blanco.png': require('../assets/products/jogger blanco.png'),
};

export default function CartScreen() {
  const navigation = useNavigation();
  const { items: cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const getLocalImage = (imgName) => {
    if (!imgName) return null;
    return productImages[imgName] || null;
  };

  const calculateSubtotal = () => {
    return totalPrice;
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 8.99;
  const total = subtotal + shipping;

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImage}>
        {getLocalImage(item.image) && (
          <Image
            source={getLocalImage(item.image)}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
      </View>
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemDetail}>{item.selectedColor}</Text>
          <Text style={styles.itemDetail}>Talla {item.selectedSize}</Text>
        </View>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrito</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={80} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtitle}>
            ¡Explora nuestros productos y encuentra algo que te guste!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Tienda')}
          >
            <Text style={styles.shopButtonText}>Ir de compras</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrito</Text>
        <TouchableOpacity 
          style={styles.clearAllButton}
          onPress={clearCart}
        >
          <Text style={styles.clearAllText}>Vaciar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Items del carrito */}
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>
            Productos ({cartItems.length})
          </Text>
          {cartItems.map(renderCartItem)}
        </View>

        {/* Cupón de descuento */}
        <View style={styles.couponSection}>
          <Text style={styles.sectionTitle}>Código de descuento</Text>
          <View style={styles.couponContainer}>
            <View style={styles.couponInput}>
              <Ionicons name="pricetag-outline" size={20} color="#9CA3AF" />
              <Text style={styles.couponPlaceholder}>Ingresa tu código</Text>
            </View>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información de envío */}
        <View style={styles.shippingSection}>
          <View style={styles.shippingInfo}>
            <Ionicons name="location-outline" size={20} color="#6366F1" />
            <View style={styles.shippingText}>
              <Text style={styles.shippingTitle}>Envío a domicilio</Text>
              <Text style={styles.shippingSubtitle}>
                Entrega en 2-3 días hábiles
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Cambiar</Text>
            </TouchableOpacity>
          </View>
          
          {shipping === 0 && (
            <View style={styles.freeShippingBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.freeShippingText}>
                ¡Felicitaciones! Tienes envío gratis
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Resumen y checkout */}
      <View style={styles.checkoutSection}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>
            Proceder al pago • ${total.toFixed(2)}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 100, // Espacio para navegación flotante
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clearAllButton: {
    padding: 8,
  },
  clearAllText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  cartSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#555555',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 8,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555555',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 12,
  },
  couponSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  couponContainer: {
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  couponPlaceholder: {
    marginLeft: 10,
    fontSize: 14,
    color: '#CCCCCC',
  },
  applyButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  shippingSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 20,
  },
  shippingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 15,
  },
  shippingText: {
    flex: 1,
    marginLeft: 12,
  },
  shippingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shippingSubtitle: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 2,
  },
  changeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  freeShippingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  freeShippingText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 8,
  },
  checkoutSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 20,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  shopButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});