export const API_CONFIG = {
    BASE_URL: 'http://127.0.0.1:8000',
    API_URL: 'http://127.0.0.1:8000/api',
    ENDPOINTS: {
      VALIDATE_PHONE: '/auth/validate-phone',
      SEND_OTP: '/auth/send-otp',
      SIGNUP: '/auth/signup',
      VERIFY_REFERRAL: '/referral/verify',
    }
  };
  
  export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_CONFIG.API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await response.json();
  };