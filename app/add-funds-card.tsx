import { 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  TextInput, 
  Alert,
  ActivityIndicator 
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ApiClient } from './utilities/apiClient';
import { TokenManager } from './utilities/tokenManager';

export default function AddFromCardScreen() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ngnAmount, setNgnAmount] = useState('0');

  // Calculate NGN amount when USD amount changes
  const handleAmountChange = (value: string) => {
    setAmount(value);
    const usdAmount = parseFloat(value) || 0;
    const calculatedNGN = (usdAmount * 1700).toLocaleString();
    setNgnAmount(calculatedNGN);
  };

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      // Get user data
      const userData = await TokenManager.getUserData();
      if (!userData || !userData.email) {
        throw new Error('User email not found');
      }

      // Calculate amount in kobo (NGN)
      const amountInKobo = Math.round(parseFloat(amount) * 1700 * 100);

      // Initialize payment
      const response = await ApiClient.post('/paystack/initialize', {
        email: userData.email,
        amount: amountInKobo,
      });

      if (response.success && response.data.authorization_url) {
        // Open payment URL in browser
        const result = await WebBrowser.openBrowserAsync(response.data.authorization_url);
        
        if (result.type === 'success') {
          // Verify payment
          const verifyResponse = await ApiClient.get(`/paystack/verify/${response.data.reference}`);
          
          if (verifyResponse.success && verifyResponse.data.status === 'success') {
            Alert.alert(
              'Success',
              'Payment successful! Your wallet has been credited.',
              [
                {
                  text: 'OK',
                  onPress: () => router.replace('/')
                }
              ]
            );
          } else {
            Alert.alert(
              'Payment Failed',
              'The transaction was not successful. Please try again.'
            );
          }
        }
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      Alert.alert(
        'Error',
        error.message || 'An error occurred while processing your payment'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Add From Card</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card Display */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Amount to Fund</Text>
            <Text style={styles.cardAmount}>₦{ngnAmount}</Text>
          </View>
        </View>
        <View style={styles.cardIndicator} />
      </View>

      {/* Amount Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.amountHeader}>
          <Text style={styles.inputLabel}>Enter Amount</Text>
          <Text style={styles.conversionRate}>One Dollar costs ₦1,700</Text>
        </View>
        
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="20"
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        {/* Service Charge Notice */}
        <View style={styles.noticeContainer}>
          <Ionicons name="information-circle" size={20} color="#8A2BE2" />
          <Text style={styles.noticeText}>
            Please Note a service charge of ₦50 will be applied
          </Text>
        </View>
      </View>

      {/* Fund Button */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={[
            styles.fundButton,
            (!amount || isLoading) && styles.fundButtonDisabled
          ]}
          onPress={initializePayment}
          disabled={!amount || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.fundButtonText}>Fund Account</Text>
          )}
        </Pressable>
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
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  cardSection: {
    padding: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#8A2BE2',
    borderRadius: 16,
    marginBottom: 16,
    padding: 24,
    justifyContent: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  cardAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardIndicator: {
    width: 32,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  inputSection: {
    padding: 24,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
  },
  conversionRate: {
    fontSize: 12,
    color: '#8A2BE2',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
  },
  currencySymbol: {
    fontSize: 20,
    color: '#666666',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    color: '#000000',
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
  },
  bottomContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  fundButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fundButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});