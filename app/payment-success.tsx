import { View, Text, StyleSheet, Pressable, Share, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function PaymentSuccessScreen() {
  const { amount, newBalance, reference } = useLocalSearchParams();
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 10,
      friction: 2,
    }).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Payment Successful!\nAmount: ₦${amount}\nReference: ${reference}\nThank you for using our service.`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Success Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
      </View>

      {/* Transaction Details Card */}
      <Animated.View 
        style={[
          styles.card,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <Text style={styles.successTitle}>Payment Successful!</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Funded</Text>
            <Text style={styles.detailValue}>₦{parseFloat(amount as string).toLocaleString()}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>New Balance</Text>
            <Text style={styles.detailValue}>₦{parseFloat(newBalance as string).toLocaleString()}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{new Date().toLocaleString()}</Text>
          </View>

          <Text style={styles.reference}>Reference: {reference}</Text>
        </View>
      </Animated.View>

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
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={20} color="#8A2BE2" />
          <Text style={styles.secondaryButtonText}>Share Receipt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  animationContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  reference: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
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
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '500',
  },
});