import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://reqres.in/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

export interface AuthResponse {
  token: string;
  id?: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${BASE_URL}/login`, credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${BASE_URL}/register`, credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      return null;
    }
  },

  async initializeAuth(): Promise<{ token: string | null }> {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return { token };
    } catch (error) {
      return { token: null };
    }
  },

  async getUserId() {
    try {
      return await AsyncStorage.getItem('userId');
    } catch (error) {
      return null;
    }
  },
}; 