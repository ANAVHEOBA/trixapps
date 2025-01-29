import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';
import PinModal from './components/PinModal';

interface SummaryParams {
  type?: string;
  provider?: string;
  phoneNumber?: string;
  smartcardNumber?: string;
  meterNumber?: string;
  plan?: string;
  planCode?: string;
  amount?: string;
}

export default function SummaryScreen() {
  const params = useLocalSearchParams<SummaryParams>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const handleConfirmPurchase = async (pin: string) => {
    if (!params.type || !params.provider) return;
    
    setIsProcessing(true);
    try {
      let endpoint = '';
      let payload: Record<string, any> = {};

      const providerLower = String(params.provider).toLowerCase();

      switch (params.type) {
        case 'data':
          endpoint = '/payscribe/data/purchase'; // Updated endpoint
          payload = {
            network: providerLower,
            recipient: params.phoneNumber,
            plan_code: params.planCode,
            ported: false, // Added ported field
            pin: pin
          };
          break;
          
        case 'airtime':
          endpoint = '/payscribe/airtime';
          payload = {
            network: providerLower,
            recipient: params.phoneNumber,
            amount: params.amount ? parseInt(params.amount) : 0,
            ported: false,
            pin: pin
          };
          break;
          
        case 'cable':
          endpoint = '/api/payscribe/cable';
          payload = {
            provider: providerLower,
            smartcard_number: params.smartcardNumber,
            plan_code: params.planCode,
            pin: pin
          };
          break;
          
        case 'electricity':
          endpoint = '/payscribe/electricity';
          payload = {
            provider: providerLower,
            meter_number: params.meterNumber,
            amount: params.amount ? parseInt(params.amount) : 0,
            pin: pin
          };
          break;
      }

      const response = await ApiClient.post(endpoint, payload);

      if (response.success) {
        router.replace({
          pathname: '/payment-success',
          params: {
            amount: response.data.amount,
            newBalance: response.data.new_balance,
            reference: response.data.reference
          }
        });
      } else {
        router.replace('/payment-failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      router.replace('/payment-failed');
    } finally {
      setIsProcessing(false);
      setShowPinModal(false);
    }
  };

  const getPoints = () => {
    if (!params.amount) return 0;
    const amount = parseInt(params.amount);
    return isNaN(amount) ? 0 : Math.floor(amount * 0.01);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Summary</Text>
        <Pressable>
          <Ionicons name="create-outline" size={24} color="#8A2BE2" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Provider</Text>
          <Text style={styles.value}>{params.provider}</Text>
        </View>

        {params.type === 'data' || params.type === 'airtime' ? (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{params.phoneNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Plan</Text>
              <Text style={styles.value}>{params.plan}</Text>
            </View>
          </>
        ) : params.type === 'cable' ? (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>SmartCard Number</Text>
              <Text style={styles.value}>{params.smartcardNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Package</Text>
              <Text style={styles.value}>{params.plan}</Text>
            </View>
          </>
        ) : params.type === 'electricity' ? (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Meter Number</Text>
              <Text style={styles.value}>{params.meterNumber}</Text>
            </View>
          </>
        ) : null}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <Image 
              source={require('../assets/icons/coin.png')}
              style={styles.coinIcon}
            />
            <Text style={styles.amount}>{params.amount}</Text>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <View style={styles.totalAmount}>
            <Image 
              source={require('../assets/icons/coin.png')}
              style={styles.coinIcon}
            />
            <Text style={styles.totalValue}>{params.amount}</Text>
          </View>
        </View>

        <Text style={styles.pointsText}>
          Complete Order to earn {getPoints()} points
        </Text>

        <Pressable 
          style={[
            styles.confirmButton,
            isProcessing && styles.processingButton
          ]}
          onPress={() => setShowPinModal(true)}
          disabled={isProcessing}
        >
          <Text style={styles.confirmButtonText}>
            {isProcessing ? 'Processing...' : 'Confirm Purchase'}
          </Text>
        </Pressable>
      </View>

      <PinModal
        visible={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSubmit={handleConfirmPurchase}
        isProcessing={isProcessing}
      />
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 44,
      paddingBottom: 20,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000000',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
    },
    label: {
      fontSize: 16,
      color: '#666666',
    },
    value: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000000',
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    coinIcon: {
      width: 20,
      height: 20,
    },
    amount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000000',
    },
    totalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 32,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000000',
    },
    totalAmount: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    totalValue: {
      fontSize: 20,
      fontWeight: '700',
      color: '#000000',
    },
    pointsText: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
      marginTop: 16,
    },
    confirmButton: {
      backgroundColor: '#8A2BE2',
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
    },
    processingButton: {
      backgroundColor: '#B794E5',
    },
    confirmButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    }
  });