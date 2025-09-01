import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from './screens/ProductsScreen';
import OutfitsScreen from './screens/OutfitsScreen';
import AccountScreen from './screens/AccountScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#111' },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Productos') {
              return <Ionicons name="shirt-outline" size={size} color={color} />;
            } else if (route.name === 'Conjuntos') {
              return <MaterialCommunityIcons name="tshirt-crew-outline" size={size} color={color} />;
            } else if (route.name === 'Cuenta') {
              return <Ionicons name="person-outline" size={size} color={color} />;
            }
            return null;
          },
        })}
      >
        <Tab.Screen name="Productos" component={ProductsScreen} />
        <Tab.Screen name="Conjuntos" component={OutfitsScreen} />
        <Tab.Screen name="Cuenta" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
