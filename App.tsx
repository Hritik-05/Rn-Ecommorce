import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeAuth } from './src/redux/slices/authSlice';
import { ThemeProvider } from './src/context/ThemeContext';

const AppWrapper = () => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
