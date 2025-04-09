import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  card: string;
  error: string;
  placeholder: string;
  buttonText: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#333333',
  primary: '#6B46C1',
  secondary: '#f5f5f5',
  accent: '#007AFF',
  border: '#DDDDDD',
  card: '#FFFFFF',
  error: '#FF3B30',
  placeholder: '#999999',
  buttonText: '#FFFFFF',
};

const darkColors: ThemeColors = {
  background: '#1A1A1A',
  text: '#FFFFFF',
  primary: '#9F7AEA',
  secondary: '#333333',
  accent: '#0A84FF',
  border: '#404040',
  card: '#2D2D2D',
  error: '#FF453A',
  placeholder: '#666666',
  buttonText: '#FFFFFF',
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}; 