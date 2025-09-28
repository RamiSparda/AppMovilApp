import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext.js';

const { width } = Dimensions.get('window');

// Mapeo de imágenes locales
const productImages = {
  'Sudadera Relaxed-fix.png': require('../assets/products/Sudadera Relaxed-fix.png'),
  'jogger blanco.png': require('../assets/products/jogger blanco.png'),
};

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(product.talla || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = product.tallasDisponibles || ['XS', 'S', 'M', 'L', 'XL'];
  const colors = product.coloresDisponibles || ['Negro', 'Blanco', 'Gris', 'Azul'];

  const getLocalImage = (imgName) => {
    if (!imgName) return null;
    return productImages[imgName] || null;
  };

  const mockReviews = [
    {
      id: '1',
      user: 'Ana M.',
      rating: 5,
      comment: 'Excelente calidad, muy cómoda y el color es tal como se ve en las fotos.',
      date: '15 Sep 2025'
    },
    {
      id: '2',
      user: 'Carlos R.',
      rating: 4,
      comment: 'Buen producto, aunque la talla viene un poco grande.',
      date: '12 Sep 2025'
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color="#F59E0B"
        style={{ marginRight: 2 }}
      />
    ));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? '#EF4444' : '#FFFFFF'} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="bag-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagen del producto */}
        <View style={styles.imageContainer}>
          {product.img && getLocalImage(product.img) && (
            <Image
              source={getLocalImage(product.img)}
              style={styles.productImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Información del producto */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            {product.Nombre || 'Nombre del producto'}
          </Text>
          
          <Text style={styles.productPrice}>
            ${product.precio || '0'}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(product.rating || 4.5)}
            </View>
            <Text style={styles.ratingText}>
              {product.rating || '4.5'} ({product.numeroReseñas || '0'} reseñas)
            </Text>
          </View>



          {/* Cantidad y Talla en una fila */}
          <View style={styles.quantityAndSizeSection}>
            <View style={styles.quantitySection}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Ionicons name="remove" size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Detalles compactos */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Detalles</Text>
            <Text style={styles.detailText}>
              {product.Nombre?.toUpperCase() || 'PRODUCTO'} | {product.color?.toUpperCase() || 'MULTICOLOR'} | TALLA {selectedSize} | {product.categoria?.toUpperCase() || 'ROPA'}
            </Text>
            <Text style={styles.detailSubtext}>
              Material: {product.material || 'Algodón 100%'}
            </Text>
            <Text style={styles.detailSubtext}>
              Descripción: {product.descripcion || 'Prenda de alta calidad, cómoda y versátil para uso diario'}
            </Text>
            <Text style={styles.detailSubtext}>
              Cuidado: {product.cuidado || 'Lavar a máquina con agua fría'}
            </Text>
          </View>

          {/* Sección de color */}
          <View style={styles.colorSection}>
            <Text style={styles.colorTitle}>Color</Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity style={[styles.colorOption, styles.colorBrown, styles.colorSelected]}>
                <View style={styles.colorCheckmark}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colorOption, styles.colorBlack]} />
              <TouchableOpacity style={[styles.colorOption, styles.colorSilver]} />
              <TouchableOpacity style={[styles.colorOption, styles.colorBlue]} />
            </View>
          </View>


        </View>
      </ScrollView>

      {/* Botón de acción */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => {
            addToCart(product, 1, selectedColor, selectedSize);
            // Opcional: Mostrar feedback visual o navegar al carrito
          }}
        >
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 8,
  },
  imageContainer: {
    width: width,
    height: width * 1.1,
    backgroundColor: '#E8F4F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productImage: {
    width: '70%',
    height: '70%',
  },
  productInfo: {
    padding: 24,
    paddingTop: 30,
  },
  productName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#999999',
  },
  section: {
    marginBottom: 25,
  },
  quantityAndSizeSection: {
    marginBottom: 30,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  detailsSection: {
    marginBottom: 30,
  },
  detailText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  detailSubtext: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  specContainer: {
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 15,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  sizeButtonActive: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sizeTextActive: {
    color: '#000000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  reviewItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  colorSection: {
    marginBottom: 40,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    borderColor: '#FFFFFF',
  },
  colorBrown: {
    backgroundColor: '#8B4513',
  },
  colorBlack: {
    backgroundColor: '#000000',
  },
  colorSilver: {
    backgroundColor: '#C0C0C0',
  },
  colorBlue: {
    backgroundColor: '#4169E1',
  },
  colorCheckmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});