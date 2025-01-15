import { ApiClient } from './apiClient';

export interface PaystackInitializeResponse {
  success: boolean;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  success: boolean;
  data: {
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    // Add other transaction details as needed
  };
}

export class PaymentService {
  static async initializePayment(email: string, amount: number): Promise<PaystackInitializeResponse> {
    try {
      const response = await ApiClient.post('/api/paystack/initialize', {
        email,
        amount: amount * 100 // Convert to kobo
      });
      return response;
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw error;
    }
  }

  static async verifyPayment(reference: string): Promise<PaystackVerifyResponse> {
    try {
      const response = await ApiClient.get(`/api/paystack/verify/${reference}`);
      return response;
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }
}