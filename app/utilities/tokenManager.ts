import AsyncStorage from '@react-native-async-storage/async-storage';

export const TokenManager = {
  // Token management
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // User data management
  setUserData: async (userData: any) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  getUserData: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  removeUserData: async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  },

  // Clear all data (for logout)
  clearAll: async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
};