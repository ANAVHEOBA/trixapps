import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Pressable, 
  ScrollView, 
  TextInput,
  Alert,  // Add Alert
  ActivityIndicator  // Add ActivityIndicator
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { TokenManager } from './utilities/tokenManager';
import { ApiClient } from './utilities/apiClient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface Network {
  id: string;
  name: string;
  logo: any; // You'll need to import these images
}

interface AirtimeAmount {
  amount: number;
  discountedAmount?: number;
  cashback?: number;
}

export default function AirtimeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


   // Add API integration functions
   const buyAirtime = async () => {
    if (!selectedNetwork || !phoneNumber || !selectedAmount) return;
  
    try {
      setIsLoading(true);
      const response = await ApiClient.post('/payscribe/airtime', {
        network: selectedNetwork.toLowerCase(), // Payscribe expects lowercase
        recipient: phoneNumber,
        amount: selectedAmount,
        ported: false // Add the required ported parameter
      });
  
      if (response.data.status) {
        // Show success message
        Alert.alert(
          "Success",
          "Airtime purchase initiated successfully",
          [
            {
              text: "OK",
              onPress: () => router.back()
            }
          ]
        );
      } else {
        // Handle error
        Alert.alert(
          "Error",
          response.data.message || 'Failed to purchase airtime'
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || 'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add new state for transaction status
const [transactionReference, setTransactionReference] = useState<string | null>(null);

// Add function to check transaction status
const checkTransactionStatus = async (reference: string) => {
  try {
    const response = await ApiClient.get(`/payscribe/transactions/${reference}`);
    
    if (response.data.status && 
        response.data.data.status === 'completed') {
      Alert.alert(
        "Success",
        "Airtime purchase completed successfully"
      );
      router.back();
    } else if (response.data.data.status === 'failed') {
      Alert.alert(
        "Failed",
        "Airtime purchase failed"
      );
    }
  } catch (error) {
    console.error('Error checking transaction:', error);
  }
};

// Add useEffect to poll transaction status
useEffect(() => {
  let intervalId: NodeJS.Timeout;

  if (transactionReference) {
    intervalId = setInterval(() => {
      checkTransactionStatus(transactionReference);
    }, 5000); // Check every 5 seconds
  }

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, [transactionReference]);


const networks: Network[] = [
  {
    id: 'mtn',  // Changed to lowercase to match API
    name: 'MTN',
    logo: require('../assets/networks/mtn.png'),
  },
  {
    id: 'airtel',
    name: 'Airtel',
    logo: require('../assets/networks/airtel.png'),
  },
  {
    id: 'glo',
    name: 'GLO',
    logo: require('../assets/networks/glo.png'),
  },
  {
    id: '9mobile',
    name: '9mobile',
    logo: require('../assets/networks/9mobile.png'),
  }
];

  // Add validation function
  const isValidPhoneNumber = (number: string) => {
    return /^[0-9]{11}$/.test(number);
  };

  const flashSales: AirtimeAmount[] = [
    { amount: 100, discountedAmount: 93 },
    { amount: 300, discountedAmount: 282 },
    { amount: 500, discountedAmount: 470 }
  ];

  const regularAmounts: AirtimeAmount[] = [
    { amount: 50, cashback: 1 },
    { amount: 100, cashback: 2 },
    { amount: 200, cashback: 3 },
    { amount: 500, cashback: 5 },
    { amount: 1000, cashback: 15 },
    { amount: 2000, cashback: 30 }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Airtime</Text>
        <Pressable onPress={() => {}}>
          <MaterialCommunityIcons name="history" size={24} color="#FFF" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Network Selection Card */}
        <View style={styles.networkCard}>
          <Pressable 
            style={styles.networkSelector}
            onPress={() => setShowNetworkModal(true)}
          >
            {selectedNetwork ? (
              <View style={styles.networkRow}>
                <Image 
                  source={networks.find(n => n.id === selectedNetwork)?.logo}
                  style={styles.networkLogo}
                />
                <Text style={styles.networkName}>
                  {networks.find(n => n.id === selectedNetwork)?.name}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#FFF" />
              </View>
            ) : (
              <Text style={styles.selectNetworkText}>Select Network</Text>
            )}
          </Pressable>

          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#999"
          />
        </View>

        {/* Network Selection Modal */}
        {showNetworkModal && (
          <View style={styles.networkModal}>
            {networks.map((network) => (
              <Pressable
                key={network.id}
                style={styles.networkOption}
                onPress={() => {
                  setSelectedNetwork(network.id);
                  setShowNetworkModal(false);
                }}
              >
                <Image source={network.logo} style={styles.networkLogo} />
                <Text style={styles.networkOptionText}>{network.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Amount Selection */}
        <View style={styles.amountsContainer}>
          {regularAmounts.map((item) => (
            <Pressable
              key={item.amount}
              style={[
                styles.amountCard,
                selectedAmount === item.amount && styles.selectedAmountCard
              ]}
              onPress={() => setSelectedAmount(item.amount)}
            >
              <Text style={styles.amountText}>₦{item.amount}</Text>
              {item.cashback && (
                <Text style={styles.cashbackText}>₦{item.cashback} Cashback</Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Custom Amount Input */}
        <View style={styles.customAmountContainer}>
          <TextInput
            style={styles.customAmountInput}
            placeholder="₦ 50-50,000"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
      // In the Pay button JSX
<Pressable 
  style={[
    styles.payButton,
    (!selectedNetwork || !isValidPhoneNumber(phoneNumber) || !selectedAmount || isLoading) && 
    styles.payButtonDisabled
  ]}
  disabled={!selectedNetwork || !isValidPhoneNumber(phoneNumber) || !selectedAmount || isLoading}
  onPress={buyAirtime}
>
  {isLoading ? (
    <ActivityIndicator color="#FFFFFF" />
  ) : (
    <Text style={styles.payButtonText}>Pay</Text>
  )}
</Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#8A2BE2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
  },
  networkCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  networkSelector: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  networkName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  selectNetworkText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
  phoneInput: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  networkModal: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  networkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  networkOptionText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  amountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  amountCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedAmountCard: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },
  amountText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  selectedAmountText: {
    color: '#FFFFFF',
  },
  cashbackText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCashbackText: {
    color: '#FFFFFF',
  },
  customAmountContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  customAmountInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  payButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
  
  successText: {
    color: '#00FF00',
    fontSize: 12,
    marginTop: 4,
  }
  
});