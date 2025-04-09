import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { Product } from '../../services/productService';
import { addToCart } from '../../redux/slices/cartSlice';

interface ProductDetailScreenProps {
  route: {
    params: {
      product: Product;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert('Success', 'Product added to cart!');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        {product.discount && (
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{product.model}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{product.color}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Icon name="shopping-cart" size={24} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  discountContainer: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProductDetailScreen; 