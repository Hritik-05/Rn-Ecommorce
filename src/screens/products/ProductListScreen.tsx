import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchMoreProducts, setSelectedCategory, setSearchQuery } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppDispatch } from '../../redux/store';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Product } from '../../services/productService';
import { useTheme } from '../../context/ThemeContext';

type ProductListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const ProductListScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  const { 
    items, 
    loading, 
    loadingMore,
    error, 
    categories, 
    selectedCategory, 
    searchQuery,
    page,
    hasMore 
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    dispatch(fetchProducts())
      .unwrap()
      .catch((error) => {
        Alert.alert('Error', error || 'Failed to load products. Please try again.');
      });
  };

  const loadMoreProducts = () => {
    if (hasMore && !loadingMore && !loading) {
      dispatch(fetchMoreProducts(page + 1))
        .unwrap()
        .catch((error) => {
          Alert.alert('Error', error || 'Failed to load more products.');
        });
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={loadProducts}
        >
          <Text style={[styles.retryText, { color: colors.buttonText }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.secondary }]}>
        <Icon name="search" size={20} color={colors.text} style={styles.searchIcon} solid />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search products..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
      </View>

    

      {loading && page === 1 ? (
        <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={handleProductPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={[styles.productsList]}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore && (
              <View style={[styles.footerLoader, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={[styles.loadingMoreText, { color: colors.text }]}>
                  Loading more products...
                </Text>
              </View>
            )
          }
          ListEmptyComponent={
            <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
              <Text style={[styles.emptyText, { color: colors.text }]}>No products found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesList: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    minHeight: 36,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  productsList: {
    padding: 10,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default ProductListScreen; 