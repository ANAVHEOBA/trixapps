import { Platform } from 'react-native';

// Configuration
const DEV_MODE = true;
const LOCAL_IP = '192.168.241.236';
const TIMEOUT = 15000; // 15 seconds

// API Base URL based on platform and environment
const getApiBaseUrl = () => {
  if (!DEV_MODE) return 'https://your-production-api.com/api';
  
  if (Platform.OS === 'web') {
    return 'http://localhost:8000/api';
  }
  
  return `http://${LOCAL_IP}:8000/api`;
};

const API_BASE = getApiBaseUrl();

// Interfaces
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

interface SignUpData {
  phoneNumber: string;
  countryCode: string;
  referralCode?: string;
  termsAccepted: boolean;
}

interface LoginData {
  phoneNumber: string;
  countryCode: string;
  password: string;
}

interface OtpData {
  phoneNumber: string;
  countryCode: string;
  otp: string;
}

// Utility functions
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (!response.ok) {
    const error = isJson ? await response.json() : { message: response.statusText };
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return isJson ? response.json() : { success: true, message: 'Success' };
};

const createHeaders = (auth?: string) => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`;
  }

  return headers;
};

// Main API object
export const api = {
  // Auth endpoints
  auth: {
    validatePhone: async (phoneNumber: string, countryCode: string): Promise<ApiResponse> => {
      try {
        console.log('Validating phone:', { phoneNumber, countryCode });
        
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/validate-phone`,
          {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
              phoneNumber: phoneNumber.replace(/[^0-9]/g, ''), // Remove non-numeric characters
              countryCode // This will be the 2-letter ISO code (e.g., "US", "GB", "NG")
            }),
          }
        );
        
        return handleResponse(response);
      } catch (error) {
        console.error('Phone validation error:', error);
        throw error;
      }
    },

    sendOtp: async (phoneNumber: string, countryCode: string): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/send-otp`,
          {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({ phoneNumber, countryCode }),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('OTP sending error:', error);
        throw error;
      }
    },

    verifyOtp: async (data: OtpData): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/verify-otp`,
          {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(data),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('OTP verification error:', error);
        throw error;
      }
    },

    signUp: async (data: SignUpData): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/signup`,
          {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(data),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      }
    },

    login: async (data: LoginData): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/signin`,
          {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(data),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    verifyReferralCode: async (code: string): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/auth/referral/verify/${code}`,
          {
            method: 'GET',
            headers: createHeaders(),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Referral verification error:', error);
        throw error;
      }
    },
  },

  // Protected endpoints
  protected: {
    getProfile: async (token: string): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/profile`,
          {
            method: 'GET',
            headers: createHeaders(token),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
    },

    updateProfile: async (token: string, data: any): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/profile`,
          {
            method: 'PUT',
            headers: createHeaders(token),
            body: JSON.stringify(data),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    },

    getWallet: async (token: string): Promise<ApiResponse> => {
      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/wallet`,
          {
            method: 'GET',
            headers: createHeaders(token),
          }
        );
        return handleResponse(response);
      } catch (error) {
        console.error('Wallet fetch error:', error);
        throw error;
      }
    },
  },

  // Utility functions
  utils: {
    createAuthHeaders: createHeaders,
    getBaseUrl: () => API_BASE,
  },
};

export default api;