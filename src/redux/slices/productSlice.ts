import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService, Product } from '../../services/productService';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  page: number;
  hasMore: boolean;
  loadingMore: boolean;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  page: 1,
  hasMore: true,
  loadingMore: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getProducts();
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  'products/fetchMoreProducts',
  async (page: number, { rejectWithValue }) => {
    try {
      const products = await productService.getProducts(page);
      return { products, page };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch more products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.page = 1;
        state.hasMore = action.payload.length === 10; 
        const categories = [...new Set(action.payload.map((product) => product.category))] as string[];
        state.categories = categories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch products';
      })
      .addCase(fetchMoreProducts.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.items = [...state.items, ...action.payload.products];
        state.page = action.payload.page;
        state.hasMore = action.payload.products.length === 10;
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload as string || 'Failed to fetch more products';
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = productSlice.actions;
export default productSlice.reducer; 