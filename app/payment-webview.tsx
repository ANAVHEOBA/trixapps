import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { ApiClient } from './utilities/apiClient';

export default function PaymentWebView() {
  const { url, reference } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationStateChange = async (navState: any) => {
    // Check if URL contains your success callback URL
    if (navState.url.includes('payment/callback')) {
      // Verify payment status
      try {
        const response = await ApiClient.get(`/payment/verify/${reference}`);
        if (response.data.status) {
          router.replace('/payment-success');
        } else {
          router.replace('/payment-failed');
        }
      } catch (error) {
        router.replace('/payment-failed');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url as string }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <ActivityIndicator 
          size="large" 
          color="#8A2BE2" 
          style={{ position: 'absolute', top: '50%', left: '50%' }} 
        />
      )}
    </View>
  );
}