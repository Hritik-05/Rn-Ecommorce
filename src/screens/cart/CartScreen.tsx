import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../context/ThemeContext';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartScreen = () => {
  const { colors } = useTheme();

  const cartItems: CartItem[] = [];

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, { 
      backgroundColor: colors.card,
      borderColor: colors.border,
      shadowColor: colors.text
    }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => Alert.alert('Remove Item', 'Item removed from cart')}
      >
        <Icon name="trash-alt" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="shopping-cart" size={64} color={colors.placeholder} />
          <Text style={[styles.emptyCartText, { color: colors.text }]}>Your cart is empty</Text>
          <Text style={[styles.emptyCartSubtext, { color: colors.placeholder }]}>
            Add some products to your cart
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyCartSubtext: {
    fontSize: 16,
    marginTop: 10,
  },
  cartList: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 5,
  },
});

export default CartScreen; 