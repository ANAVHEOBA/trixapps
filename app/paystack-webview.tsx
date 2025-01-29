import { View, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { ApiClient } from './utilities/apiClient';

export default function PaystackWebViewScreen() {
  const { url, reference } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  // Update the handleNavigationStateChange function
  const handleNavigationStateChange = async (navState: any) => {
    console.log('Navigation state changed:', navState.url); // Debug log
    
    // Check if URL contains paystack callback
    if (navState.url.includes('/payment/callback')) {
        setIsVerifying(true);
        try {
            // Wait a moment to ensure payment is processed
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const response = await ApiClient.get(`/paystack/verify/${reference}`);
            console.log('Verification Response:', response);
            
            if (response.success) {
                router.replace({
                    pathname: '/payment-success',
                    params: {
                        amount: response.data.amount.toString(),
                        newBalance: response.data.new_balance,
                        reference: response.data.reference
                    }
                });
            } else {
                console.error('Payment verification failed:', response.message);
                router.replace({
                    pathname: '/payment-failed',
                    params: {
                        error: response.error || 'verification_failed'
                    }
                });
            }
        } catch (error) {
            console.error('Verification error:', error);
            router.replace({
                pathname: '/payment-failed',
                params: {
                    error: 'system_error'
                }
            });
        } finally {
            setIsVerifying(false);
        }
    }
};
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Cancel Payment',
              'Are you sure you want to cancel this payment?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => router.back(),
                },
              ]
            );
          }}
        >
          <Ionicons name="close" size={24} color="#000" />
        </Pressable>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: url as string }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Loading Indicators */}
      {(isLoading || isVerifying) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8A2BE2" />
        </View>
      )}
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
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});