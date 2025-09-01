import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setProducts(items);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Prueba de pantalla de productos!</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.Nombre}</Text>
            <Text style={styles.productDetail}>Color: {item.color}</Text>
            <Text style={styles.productDetail}>Talla: {item.talla}</Text>
            <Text style={styles.productDetail}>Stock: {item.stock}</Text>
            <Text style={styles.productPrice}>${item.precio}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetail: {
    color: '#fff',
    fontSize: 15,
    marginTop: 2,
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
});
