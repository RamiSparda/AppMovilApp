// Datos de productos de ejemplo para Firebase
// Este archivo contiene productos con descripciones completas en español

export const productosEjemplo = [
  {
    id: '1',
    Nombre: 'Sudadera Relaxed Fit',
    precio: 45.99,
    color: 'Negro',
    talla: 'M',
    categoria: 'Sudaderas',
    material: 'Algodón 100% orgánico',
    descripcion: 'Sudadera de corte relajado perfecta para el día a día. Confeccionada con algodón orgánico de alta calidad que proporciona máxima comodidad y durabilidad.',
    cuidado: 'Lavar a máquina con agua fría, no usar blanqueador',
    img: 'Sudadera Relaxed-fix.png',
    disponible: true,
    coloresDisponibles: ['Negro', 'Gris', 'Blanco', 'Azul marino'],
    tallasDisponibles: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    numeroReseñas: 234
  },
  {
    id: '2',
    Nombre: 'Jogger Blanco Premium',
    precio: 35.99,
    color: 'Blanco',
    talla: 'L',
    categoria: 'Pantalones',
    material: 'Mezcla de algodón y poliéster (80/20)',
    descripcion: 'Jogger de estilo moderno con ajuste cómodo. Ideal para actividades deportivas o para un look casual urbano. Cuenta con cordón ajustable y bolsillos laterales.',
    cuidado: 'Lavar a máquina a 30°C, secar al aire libre',
    img: 'jogger blanco.png',
    disponible: true,
    coloresDisponibles: ['Blanco', 'Negro', 'Gris', 'Azul'],
    tallasDisponibles: ['S', 'M', 'L', 'XL'],
    rating: 4.3,
    numeroReseñas: 156
  },
  {
    id: '3',
    Nombre: 'Hoodie Urban Style',
    precio: 52.99,
    color: 'Gris',
    talla: 'M',
    categoria: 'Sudaderas',
    material: 'Algodón orgánico con forro interior de felpa',
    descripcion: 'Hoodie con diseño urbano contemporáneo. Capucha ajustable, bolsillo canguro frontal y puños elásticos. Perfecta para la temporada de otoño-invierno.',
    cuidado: 'Lavar a máquina, usar ciclo delicado',
    img: 'Sudadera Relaxed-fix.png',
    disponible: true,
    coloresDisponibles: ['Gris', 'Negro', 'Blanco', 'Verde militar'],
    tallasDisponibles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    numeroReseñas: 189
  },
  {
    id: '4',
    Nombre: 'Camiseta Básica Premium',
    precio: 24.99,
    color: 'Blanco',
    talla: 'M',
    categoria: 'Camisetas',
    material: 'Algodón Pima 100%',
    descripcion: 'Camiseta básica de corte clásico confeccionada con algodón Pima de primera calidad. Suave al tacto, transpirable y resistente al uso frecuente.',
    cuidado: 'Lavar a máquina, no planchar sobre estampados',
    img: 'Sudadera Relaxed-fix.png',
    disponible: true,
    coloresDisponibles: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Rojo'],
    tallasDisponibles: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.4,
    numeroReseñas: 312
  }
];

// Función para agregar productos a Firebase (solo ejecutar una vez)
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

export const agregarProductosEjemplo = async () => {
  try {
    for (const producto of productosEjemplo) {
      await addDoc(collection(firestore, 'productos'), producto);
      console.log('Producto agregado:', producto.Nombre);
    }
    console.log('Todos los productos han sido agregados exitosamente');
  } catch (error) {
    console.error('Error al agregar productos:', error);
  }
};