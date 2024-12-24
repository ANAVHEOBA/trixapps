import storage from './storage';
import api from './api';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
}

const auth = {
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await storage.getItem('userToken');
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await storage.getItem('userToken');
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  },

  async login(phoneNumber: string, countryCode: string): Promise<boolean> {
    try {
      const response = await api.auth.login({
        phoneNumber,
        countryCode,
        password: '' // Add password if needed
      });

      if (response.success && response.data) {
        await storage.setItem('userToken', response.data.token);
        await storage.setItem('userData', JSON.stringify(response.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  async logout(): Promise<void> {
    try {
      await storage.removeItem('userToken');
      await storage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};

export default auth;