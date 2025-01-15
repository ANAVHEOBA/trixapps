import { 
    View, 
    Text, 
    Pressable, 
    StyleSheet, 
    TextInput, 
    Alert,
    ActivityIndicator 
  } from "react-native";
  import * as Clipboard from 'expo-clipboard';
  import { router } from "expo-router";
  import { Ionicons } from '@expo/vector-icons';
  import * as WebBrowser from 'expo-web-browser';
  import { useState } from 'react';
  import { ApiClient } from './utilities/apiClient';
  import { TokenManager } from './utilities/tokenManager';
  
  export default function PaymentScreen() {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ngnAmount, setNgnAmount] = useState('0');
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  
    // Calculate NGN amount when USD amount changes
    const handleAmountChange = (value: string) => {
      setAmount(value);
      const usdAmount = parseFloat(value) || 0;
      const calculatedNGN = (usdAmount * 1700).toLocaleString();
      setNgnAmount(calculatedNGN);
    };
  
    // Initialize payment
    const initializePayment = async () => {
        if (!amount || parseFloat(amount) <= 0) {
          Alert.alert('Error', 'Please enter a valid amount');
          return;
        }
    
        setIsLoading(true);
        try {
          const userEmail = await TokenManager.getUserData().then(user => user.email);
          
          const ngnAmount = parseFloat(amount) * 1700;
          const koboAmount = Math.round(ngnAmount * 100);
    
          const response = await ApiClient.post('/paystack/initialize', {
            email: userEmail,
            amount: koboAmount,
            currency: 'NGN'
          });
    
          console.log('Paystack Response:', response);
    
          if (response.success && response.data?.data?.authorization_url) {
            const reference = response.data.data.reference;
            const authUrl = response.data.data.authorization_url;
            
            // Open the payment URL in browser
            const result = await WebBrowser.openBrowserAsync(authUrl);
            
            // Check if the browser was dismissed
            if (result.type === WebBrowser.WebBrowserResultType.DISMISS) {
              // Start checking payment status
              startPaymentStatusCheck(reference);
            }
          } else {
            Alert.alert('Error', 'Unable to initialize payment');
          }
        } catch (error: any) {
          console.error('Payment initialization error:', error);
          Alert.alert(
            'Error',
            error.response?.data?.message || 'Something went wrong. Please try again.'
          );
        } finally {
          setIsLoading(false);
        }
    };
  
    // Check payment status
    const startPaymentStatusCheck = async (reference: string) => {
        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(async () => {
            try {
                const response = await ApiClient.get(`/paystack/verify/${reference}`);
                
                if (response.success && response.data?.data?.status === 'success') {
                    // Update wallet balance
                    const walletResponse = await ApiClient.post('/wallet/payment-callback', {
                        reference: reference
                    });
    
                    if (walletResponse.success) {
                        clearInterval(interval);
                        Alert.alert('Success', 'Payment confirmed and wallet updated!');
                        router.replace('/');
                    }
                } else if (response.data?.data?.status === 'failed') {
                    clearInterval(interval);
                    Alert.alert('Failed', 'Payment failed. Please try again.');
                }
    
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                clearInterval(interval);
            }
        }, 10000);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Make Payment</Text>
          <View style={styles.placeholder} />
        </View>
  
        <View style={styles.content}>
          <Text style={styles.label}>Enter Amount (USD)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
          <Text style={styles.conversionText}>≈ ₦{ngnAmount}</Text>
  
          <Pressable 
            style={[styles.payButton, (!amount || isLoading) && styles.payButtonDisabled]}
            onPress={initializePayment}
            disabled={!amount || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.payButtonText}>Proceed to Payment</Text>
            )}
          </Pressable>
  
          {paymentUrl && (
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentInfoText}>
                You will be redirected to complete your payment.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 24,
      paddingTop: 48,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    placeholder: {
      width: 24,
    },
    content: {
      padding: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 8,
    },
    conversionText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 24,
    },
    payButton: {
      backgroundColor: '#8A2BE2',
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    payButtonDisabled: {
      backgroundColor: '#E0E0E0',
    },
    payButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    paymentInfo: {
      marginTop: 24,
      padding: 16,
      backgroundColor: '#F8F0FF',
      borderRadius: 12,
    },
    paymentInfoText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
    }
  });