import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Mapeo de imágenes locales
const productImages = {
  'Sudadera Relaxed-fix.png': require('../assets/products/Sudadera Relaxed-fix.png'),
  'jogger blanco.png': require('../assets/products/jogger blanco.png'),
};

export default function OutfitsScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Trending');

  const categories = ['Trending', 'Casual', 'Deportivo', 'Urbano', 'Formal'];

  // Mock data para los conjuntos
  const outfits = [
    {
      id: '1',
      name: 'Look Casual Perfecto',
      creator: 'Ana M.',
      likes: 142,
      items: [
        { id: 'item1', name: 'Sudadera Relaxed', price: 45.99, image: 'Sudadera Relaxed-fix.png' },
        { id: 'item2', name: 'Jogger Blanco', price: 35.99, image: 'jogger blanco.png' },
      ],
      totalPrice: 81.98,
      category: 'Casual',
      mainImage: 'Sudadera Relaxed-fix.png',
      isLiked: false,
    },
    {
      id: '2',
      name: 'Deportivo Urbano',
      creator: 'Carlos R.',
      likes: 89,
      items: [
        { id: 'item3', name: 'Jogger Blanco', price: 35.99, image: 'jogger blanco.png' },
        { id: 'item4', name: 'Sudadera Sport', price: 52.99, image: 'Sudadera Relaxed-fix.png' },
      ],
      totalPrice: 88.98,
      category: 'Deportivo',
      mainImage: 'jogger blanco.png',
      isLiked: true,
    },
    {
      id: '3',
      name: 'Estilo Minimalista',
      creator: 'María L.',
      likes: 203,
      items: [
        { id: 'item5', name: 'Sudadera Básica', price: 39.99, image: 'Sudadera Relaxed-fix.png' },
      ],
      totalPrice: 39.99,
      category: 'Trending',
      mainImage: 'Sudadera Relaxed-fix.png',
      isLiked: false,
    },
  ];

  const getLocalImage = (imgName) => {
    if (!imgName) return null;
    return productImages[imgName] || null;
  };

  const filteredOutfits = selectedCategory === 'Trending' 
    ? outfits 
    : outfits.filter(outfit => outfit.category === selectedCategory);

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

  const renderOutfitItem = ({ item }) => (
    <View style={styles.outfitCard}>
      {/* Header del conjunto */}
      <View style={styles.outfitHeader}>
        <View style={styles.creatorInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.creator.charAt(0)}</Text>
          </View>
          <Text style={styles.creatorName}>{item.creator}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Imagen principal del conjunto */}
      <View style={styles.mainImageContainer}>
        {getLocalImage(item.mainImage) && (
          <Image
            source={getLocalImage(item.mainImage)}
            style={styles.mainImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons 
              name={item.isLiked ? 'heart' : 'heart-outline'} 
              size={24} 
              color={item.isLiked ? '#EF4444' : '#FFFFFF'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Información del conjunto */}
      <View style={styles.outfitInfo}>
        <Text style={styles.outfitName}>{item.name}</Text>
        <View style={styles.outfitStats}>
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={14} color="#EF4444" />
            <Text style={styles.likesText}>{item.likes} likes</Text>
          </View>
          <Text style={styles.totalPrice}>${item.totalPrice}</Text>
        </View>
      </View>

      {/* Items del conjunto */}
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>Productos incluidos:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.items.map((product, index) => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              {getLocalImage(product.image) && (
                <Image
                  source={getLocalImage(product.image)}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="bag-add-outline" size={18} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Agregar todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar conjunto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Conjuntos</Text>
          <Text style={styles.headerSubtitle}>
            Looks armados por la comunidad
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
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

      {/* Lista de conjuntos */}
      <FlatList
        data={filteredOutfits}
        renderItem={renderOutfitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.outfitsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="shirt-outline" size={60} color="#FFFFFF" />
            <Text style={styles.emptyText}>No hay conjuntos en esta categoría</Text>
            <Text style={styles.emptySubtext}>
              Explora otras categorías o vuelve más tarde
            </Text>
          </View>
        }
      />
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
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
  outfitsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  outfitCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mainImageContainer: {
    position: 'relative',
    height: 200,
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#555555',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outfitInfo: {
    padding: 15,
    paddingBottom: 10,
  },
  outfitName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  outfitStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 4,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  productItem: {
    width: 80,
    marginRight: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#555555',
    marginBottom: 6,
  },
  productName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#555555',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
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
    color: '#CCCCCC',
    textAlign: 'center',
  },
});