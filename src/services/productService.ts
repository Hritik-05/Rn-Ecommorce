import axios from 'axios';
import { API_URL } from '../config';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount?: number;
  popular?: boolean;
  onSale?: boolean;
}

interface ProductResponse {
  status: string;
  message: string;
  products: Product[];
}

const ITEMS_PER_PAGE = 10;

export const productService = {
  async getProducts(page: number = 1): Promise<Product[]> {
    try {
      const response = await axios.get<ProductResponse>(`${API_URL}/products`, {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
        },
      });
      if (response.data.status === 'SUCCESS') {
        return response.data.products;
      }
      throw new Error(response.data.message || 'Failed to fetch products');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  },
}; 