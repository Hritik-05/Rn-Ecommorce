import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Product } from '../services/productService';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  item: Product;
  onPress: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2;

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { colors } = useTheme();

  const handleBuyNow = () => {
    setShowQuantity(true);
  };

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQuantity); 
    });
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={[styles.image, { backgroundColor: colors.secondary }]} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.priceQuantityContainer}>
          <Text style={[styles.price, { color: colors.text }]}>
            ${showQuantity ? (item.price * quantity).toFixed(2) : item.price}
          </Text>
          {showQuantity && (
            <View style={[styles.quantityContainer, { backgroundColor: colors.secondary }]}>
              <TouchableOpacity 
                style={[styles.quantityButton, { backgroundColor: colors.primary }]}
                onPress={() => handleQuantityChange(false)}
              >
                <Icon name="minus" size={10} color={colors.buttonText} />
              </TouchableOpacity>
              <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>
              <TouchableOpacity 
                style={[styles.quantityButton, { backgroundColor: colors.primary }]}
                onPress={() => handleQuantityChange(true)}
              >
                <Icon name="plus" size={10} color={colors.buttonText} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.addToCartButton, { borderColor: colors.border, backgroundColor: colors.card }]}
          >
            <Text style={[styles.addToCartText, { color: colors.text }]}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.buyNowButton, { backgroundColor: colors.primary }]}
            onPress={handleBuyNow}
          >
            <Text style={[styles.buyNowText, { color: colors.buttonText }]}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    margin: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '500',
  },
  buyNowText: {
    fontSize: 12,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 2,
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  quantity: {
    fontSize: 14,
    marginHorizontal: 6,
    minWidth: 16,
    textAlign: 'center',
  },
});

export default ProductCard; 