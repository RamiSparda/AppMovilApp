import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useCart } from '../contexts/CartContext.js';

const { width } = Dimensions.get('window');

// Mapeo de imágenes locales
const productImages = {
  'Sudadera Relaxed-fix.png': require('../assets/products/Sudadera Relaxed-fix.png'),
  'jogger blanco.png': require('../assets/products/jogger blanco.png'),
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart, totalItems } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos destacados (limitamos a 4)
        const productsQuery = query(collection(firestore, 'productos'), limit(4));
        const productsSnapshot = await getDocs(productsQuery);
        const products = [];
        productsSnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setFeaturedProducts(products);

        // Simular conjuntos (en una app real vendrían de Firebase)
        const mockOutfits = [
          { id: '1', name: 'Look Casual', image: 'Sudadera Relaxed-fix.png', price: 89.99 },
          { id: '2', name: 'Deportivo Urbano', image: 'jogger blanco.png', price: 124.99 },
        ];
        setOutfits(mockOutfits);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLocalImage = (imgName) => {
    if (!imgName) return null;
    return productImages[imgName] || null;
  };

  const bannerOffers = [
    { id: '1', title: '50% OFF', subtitle: 'En sudaderas seleccionadas', color: '#6366F1' },
    { id: '2', title: 'Nueva Colección', subtitle: 'Primavera 2025', color: '#EC4899' },
    { id: '3', title: 'Envío Gratis', subtitle: 'En compras +$80', color: '#10B981' },
  ];

  const categories = [
    { id: '1', name: 'Sudaderas', icon: 'shirt-outline', color: '#6366F1' },
    { id: '2', name: 'Pantalones', icon: 'fitness-outline', color: '#EC4899' },
    { id: '3', name: 'Zapatillas', icon: 'footsteps-outline', color: '#10B981' },
    { id: '4', name: 'Accesorios', icon: 'watch-outline', color: '#F59E0B' },
  ];

  const renderBannerItem = ({ item }) => (
    <TouchableOpacity style={[styles.bannerItem, { backgroundColor: item.color }]}>
      <Text style={styles.bannerTitle}>{item.title}</Text>
      <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Tienda')}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <TouchableOpacity 
        style={styles.productTouchable}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <View style={styles.productImageContainer}>
          {item.img && getLocalImage(item.img) && (
            <Image
              source={getLocalImage(item.img)}
              style={styles.productImage}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity style={styles.floatingLikeButton}>
            <Ionicons name="heart-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.Nombre || 'Producto'}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>
              ${item.precio || '0'}
            </Text>
            <TouchableOpacity 
              style={styles.floatingAddButton}
              onPress={() => addToCart(item)}
            >
              <Ionicons name="add" size={16} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderOutfitItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.outfitItem}
      onPress={() => navigation.navigate('Conjuntos')}
    >
      {getLocalImage(item.image) && (
        <Image
          source={getLocalImage(item.image)}
          style={styles.outfitImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.outfitInfo}>
        <Text style={styles.outfitName}>{item.name}</Text>
        <Text style={styles.outfitPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, Ramiro!</Text>
            <Text style={styles.title}>Descubre tu estilo</Text>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Banner de ofertas */}
        <View style={styles.section}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bannerOffers}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            style={styles.bannerList}
            contentContainerStyle={styles.bannerContainer}
          />
        </View>

        {/* Categorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoryContainer}
          />
        </View>

        {/* Productos recomendados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendados para ti</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tienda')}>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productContainer}
          />
        </View>

        {/* Sección Conjuntos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conjuntos Trending</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Conjuntos')}>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Looks armados por la comunidad
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={outfits}
            renderItem={renderOutfitItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.outfitContainer}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bannerList: {
    paddingHorizontal: 20,
  },
  bannerContainer: {
    gap: 15,
  },
  bannerItem: {
    width: width * 0.75,
    height: 120,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  categoryItem: {
    alignItems: 'center',
    width: 70,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  productContainer: {
    paddingHorizontal: 20,
  },
  productItem: {
    width: 160,
    marginRight: 15,
  },
  productTouchable: {
    backgroundColor: '#333333',
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
  },
  floatingLikeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  floatingAddButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  outfitContainer: {
    paddingHorizontal: 20,
  },
  outfitItem: {
    width: 180,
    marginRight: 15,
    backgroundColor: '#333333',
    borderRadius: 16,
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: 120,
  },
  outfitInfo: {
    padding: 12,
  },
  outfitName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  outfitPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});