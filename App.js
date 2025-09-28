import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductsScreen from './screens/ProductsScreen.jsx';
import ProductDetailScreen from './screens/ProductDetailScreen.jsx';
import OutfitsScreen from './screens/OutfitsScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import AccountScreen from './screens/AccountScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
// import InitializeFirebase from './screens/InitializeFirebase.jsx'; // Descomenta para inicializar productos
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CartProvider } from './contexts/CartContext.js';

// NOTA: Para agregar productos de ejemplo a Firebase:
// 1. Descomenta la línea de InitializeFirebase arriba
// 2. Reemplaza temporalmente LoginScreen con InitializeFirebase en la navegación
// 3. Ejecuta la app y presiona el botón "Agregar Productos de Ejemplo"
// 4. Vuelve a comentar y restaurar LoginScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack({ onLogout }) {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#000000' }
      }}
    >
      <Stack.Screen name="TabNavigator">
        {() => <TabNavigator onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          position: 'absolute',
          backgroundColor: '#333333',
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#999999',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 20,
          marginHorizontal: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          const iconSize = 24;
          
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tienda') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Conjuntos') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'Cuenta') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return (
            <View style={{
              backgroundColor: focused ? '#666666' : 'transparent',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: focused ? '#FFFFFF' : 'transparent',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: focused ? 5 : 0,
            }}>
              <Ionicons name={iconName} size={iconSize} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tienda" component={ProductsScreen} />
      <Tab.Screen name="Conjuntos" component={OutfitsScreen} />
      <Tab.Screen 
        name="Cuenta" 
        children={() => <AccountScreen onLogout={onLogout} />} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="Main">
              {() => <MainStack onLogout={handleLogout} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login">
              {() => <LoginScreen onLogin={handleLogin} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}