import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { agregarProductosEjemplo } from '../productosEjemplo';

// Componente para agregar productos de ejemplo a Firebase
// Solo usar una vez para inicializar la base de datos
export default function InitializeFirebase() {
  const handleAddProducts = async () => {
    try {
      await agregarProductosEjemplo();
      Alert.alert(
        'Éxito', 
        'Productos agregados correctamente a Firebase',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error', 
        'No se pudieron agregar los productos: ' + error.message,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicializar Firebase</Text>
      <Text style={styles.description}>
        Presiona el botón para agregar productos de ejemplo a Firebase.
        {'\n'}Solo hacer esto una vez.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAddProducts}>
        <Text style={styles.buttonText}>Agregar Productos de Ejemplo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});