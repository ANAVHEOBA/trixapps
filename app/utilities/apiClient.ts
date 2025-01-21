import { TokenManager } from './tokenManager';

const API_URL = 'http://192.168.172.236:8001/api';

export const ApiClient = {
  async handleResponse(response: Response) {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      if (contentType?.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    
    throw new Error('Invalid response format');
  },

  get: async (endpoint: string) => {
    try {
      const token = await TokenManager.getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this
        },
      });
      return ApiClient.handleResponse(response);
    } catch (error) {
      console.error('API Get Error:', error);
      throw error;
    }
  },

  post: async (endpoint: string, data: any) => {
    try {
      const token = await TokenManager.getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this
        },
        body: JSON.stringify(data),
      });
      return ApiClient.handleResponse(response);
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const token = await TokenManager.getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT', // Fixed method
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this
        },
        body: JSON.stringify(data),
      });
      return ApiClient.handleResponse(response);
    } catch (error) {
      console.error('API Put Error:', error);
      throw error;
    }
  },

  delete: async (endpoint: string) => { // Removed data parameter
    try {
      const token = await TokenManager.getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE', // Fixed method
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this
        },
      });
      return ApiClient.handleResponse(response);
    } catch (error) {
      console.error('API Delete Error:', error);
      throw error;
    }
  },
};