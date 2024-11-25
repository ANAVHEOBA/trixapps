import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AddFromWalletScreen() {
  const [amount, setAmount] = useState('');
  const walletBalance = 120000;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Add From Wallet</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card Display */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          {/* Card content */}
        </View>
        <View style={styles.cardIndicator} />
      </View>

      {/* Amount Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.amountHeader}>
          <Text style={styles.inputLabel}>Enter Amount</Text>
          <Text style={styles.conversionRate}>One Dollar costs 1,700 points</Text>
        </View>
        
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="20"
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceCurrency}>₳</Text>
            <Text style={styles.balanceAmount}>{walletBalance.toLocaleString()}</Text>
          </View>
        </View>

        {/* Service Charge Notice */}
        <View style={styles.noticeContainer}>
          <Ionicons name="information-circle" size={20} color="#8A2BE2" />
          <Text style={styles.noticeText}>
            Please Note a service charge of 50 points will be applied
          </Text>
        </View>
      </View>

      {/* Fund Button */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={styles.fundButton}
          onPress={() => {
            // Handle funding logic
            router.back();
          }}
        >
          <Text style={styles.fundButtonText}>Fund Account</Text>
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceCurrency: {
    width: 24,
    height: 24,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '500',
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
});