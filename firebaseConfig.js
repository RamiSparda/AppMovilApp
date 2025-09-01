// Configuración de Firebase para la app móvil
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCs7P34rcEFrkVjqFBdKiV2HDBP6-COg5g',
  authDomain: 'appmovilecoomerce.firebaseapp.com',
  projectId: 'appmovilecoomerce',
  storageBucket: 'appmovilecoomerce.firebasestorage.app',
  messagingSenderId: '655111477269',
  appId: '1:655111477269:web:ff1844faab6fec3430d61c',
  measurementId: 'G-NJLRL2NTHV'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
