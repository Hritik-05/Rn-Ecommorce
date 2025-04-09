import { Product } from '../services/productService';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ProductDetail: { product: Product };
};

export type MainTabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
}; 