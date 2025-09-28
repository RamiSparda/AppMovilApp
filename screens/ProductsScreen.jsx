import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../contexts/CartContext.js';

// Mapeo estático de imágenes locales
const productImages = {
  'Sudadera Relaxed-fix.png': require('../assets/products/Sudadera Relaxed-fix.png'),
  'jogger blanco.png': require('../assets/products/jogger blanco.png'),
};

export default function ProductsScreen() {
  const navigation = useNavigation();
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Sudaderas', 'Pantalones', 'Zapatillas', 'Accesorios'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'productos'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setProducts(items);
        setFilteredProducts(items);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);

  const filterProducts = () => {
    let filtered = products;
    
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => 
        product.categoria?.toLowerCase() === selectedCategory.toLowerCase() ||
        product.Nombre?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const getLocalImage = (imgName) => {
    if (!imgName) return null;
    return productImages[imgName] || null;
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
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
          {item.Nombre ? String(item.Nombre) : 'Producto'}
        </Text>
        <View style={styles.productDetails}>
          {item.color && (
            <Text style={styles.productDetail}>{String(item.color)}</Text>
          )}
          {item.categoria && (
            <Text style={styles.productDetail}>{String(item.categoria)}</Text>
          )}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            ${item.precio ? String(item.precio) : '0'}
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
  );

  const renderCategoryFilter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryFilter,
        selectedCategory === item && styles.categoryFilterActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryFilterText,
        selectedCategory === item && styles.categoryFilterTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tienda</Text>
          <Text style={styles.headerSubtitle}>
            {filteredProducts.length} productos disponibles
          </Text>
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

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros de categoría */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategoryFilter}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryFilterContainer}
        />
      </View>

      {/* Producto destacado */}
      {filteredProducts.length > 0 && (
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>Producto Destacado</Text>
          <View style={styles.featuredCard}>
            <View style={styles.featuredImageContainer}>
              {filteredProducts[0].img && getLocalImage(filteredProducts[0].img) && (
                <Image
                  source={getLocalImage(filteredProducts[0].img)}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity style={styles.featuredLikeButton}>
                <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredProductName}>
                {filteredProducts[0].Nombre || 'Producto Destacado'}
              </Text>
              <Text style={styles.featuredProductPrice}>
                ${filteredProducts[0].precio || '999.99'}
              </Text>
              <TouchableOpacity 
                style={styles.featuredButton}
                onPress={() => navigation.navigate('ProductDetail', { product: filteredProducts[0] })}
              >
                <Text style={styles.featuredButtonText}>Ver más</Text>
                <Ionicons name="arrow-forward" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Grid de productos */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="shirt-outline" size={60} color="#FFFFFF" />
            <Text style={styles.emptyText}>No se encontraron productos</Text>
            <Text style={styles.emptySubtext}>
              Intenta con otros términos de búsqueda
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 100, // Espacio para navegación flotante
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999999',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearButton: {
    padding: 5,
  },
  filterSection: {
    marginBottom: 20,
  },
  categoryFilterContainer: {
    paddingHorizontal: 20,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#666666',
  },
  categoryFilterActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  categoryFilterTextActive: {
    color: '#000000',
  },
  productGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#333333',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555555',
  },
  floatingLikeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
    position: 'relative',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 18,
  },
  productDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  productDetail: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#555555',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 3,
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
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  featuredCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#4C63D2',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#4C63D2',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredLikeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  featuredProductName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredProductPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  featuredButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  featuredButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});