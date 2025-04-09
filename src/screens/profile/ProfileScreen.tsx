import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../context/ThemeContext';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Icon name="user-circle" size={80} color={colors.primary} solid />
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.placeholder }]}>john.doe@example.com</Text>
        <Text style={[styles.userId, { color: colors.placeholder }]}>User ID: {userId}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Icon name="shopping-bag" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>My Orders</Text>
          <Icon name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Icon name="heart" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Wishlist</Text>
          <Icon name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Icon name="moon" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isDarkMode ? colors.accent : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Icon name="cog" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
          <Icon name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Icon name="question-circle" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
          <Icon name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { borderTopColor: colors.border }]} 
        onPress={handleLogout}
      >
        <Icon name="sign-out-alt" size={24} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  userId: {
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
    borderTopWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default ProfileScreen; 