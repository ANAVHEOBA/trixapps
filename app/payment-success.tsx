import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

export default function PaymentSuccessScreen() {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View style={[
          styles.iconContainer,
          { transform: [{ scale: scaleAnim }] }
        ]}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={64} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.message}>
          Your wallet has been credited successfully.
        </Text>

        {/* Amount Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsLabel}>Amount Added</Text>
          <Text style={styles.amount}>₦50,000</Text>
          <Text style={styles.timestamp}>
            {new Date().toLocaleString()}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.primaryButton}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </Pressable>

          <Pressable 
            style={styles.secondaryButton}
            onPress={() => router.replace('/transactions')}
          >
            <Text style={styles.secondaryButtonText}>View Transaction</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
  },
});