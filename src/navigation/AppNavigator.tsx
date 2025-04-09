import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { RootStackParamList, MainTabParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'shopping-bag';

          if (route.name === 'Products') {
            iconName = 'store';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} solid={focused} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
              options={{
                headerShown: true,
                title: 'Product Details',
                headerBackTitle: 'Back',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 