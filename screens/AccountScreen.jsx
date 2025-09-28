import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ onLogout }) {
  const userData = {
    name: 'Ramiro',
    email: 'ramiro@email.com',
    phone: '+1 234 567 890',
  };

  const orderHistory = [
    { id: '1', date: '15 Sep 2025', total: 89.98, status: 'Entregado' },
    { id: '2', date: '8 Sep 2025', total: 124.99, status: 'En camino' },
    { id: '3', date: '2 Sep 2025', total: 65.50, status: 'Entregado' },
  ];

  const MenuSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, textColor = '#374151' }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#FFFFFF" />
        </View>
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, { color: textColor }]}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );

  const OrderItem = ({ order }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderDate}>{order.date}</Text>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderTotal}>${order.total}</Text>
        <View style={[
          styles.statusBadge,
          order.status === 'Entregado' ? styles.statusDelivered : styles.statusInTransit
        ]}>
          <Text style={[
            styles.statusText,
            order.status === 'Entregado' ? styles.statusDeliveredText : styles.statusInTransitText
          ]}>
            {order.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header del perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>

        {/* Información personal */}
        <MenuSection title="Información personal">
          <MenuItem
            icon="person-outline"
            title="Datos personales"
            subtitle="Nombre, email, teléfono"
            onPress={() => console.log('Datos personales')}
          />
          <MenuItem
            icon="location-outline"
            title="Direcciones"
            subtitle="Gestiona tus direcciones de envío"
            onPress={() => console.log('Direcciones')}
          />
          <MenuItem
            icon="card-outline"
            title="Métodos de pago"
            subtitle="Tarjetas y métodos guardados"
            onPress={() => console.log('Métodos de pago')}
          />
        </MenuSection>

        {/* Historial de pedidos */}
        <MenuSection title="Pedidos recientes">
          {orderHistory.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
          <MenuItem
            icon="time-outline"
            title="Ver historial completo"
            onPress={() => console.log('Historial completo')}
          />
        </MenuSection>

        {/* Configuración */}
        <MenuSection title="Configuración">
          <MenuItem
            icon="notifications-outline"
            title="Notificaciones"
            subtitle="Gestiona tus notificaciones"
            onPress={() => console.log('Notificaciones')}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacidad y seguridad"
            onPress={() => console.log('Privacidad')}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Ayuda y soporte"
            onPress={() => console.log('Ayuda')}
          />
        </MenuSection>

        {/* Acciones */}
        <MenuSection title="Cuenta">
          <MenuItem
            icon="log-out-outline"
            title="Cerrar sesión"
            onPress={onLogout}
            showArrow={false}
            textColor="#EF4444"
          />
        </MenuSection>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 100, // Espacio para navegación flotante
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#000000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderId: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#ECFDF5',
  },
  statusInTransit: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDeliveredText: {
    color: '#10B981',
  },
  statusInTransitText: {
    color: '#F59E0B',
  },
});