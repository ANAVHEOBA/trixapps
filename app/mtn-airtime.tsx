import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function AirtimeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('816 000 2000');
  const [amount, setAmount] = useState('2000');
  const quickAmounts = ['100', '200', '500', '1000'];


  const handlePurchase = () => {
    if (phoneNumber && amount) {
      router.push({
        pathname: '/summary',
        params: {
          provider: 'Mtn',
          subscriptionType: 'Airtime',
          phoneNumber: phoneNumber,
          plan: `${amount} Airtime`,
          amount: amount,
          type: 'airtime'
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>

          <View style={styles.balanceContainer}>
            <Image 
              source={require("../assets/icons/coin.png")}
              style={styles.coinIcon}
            />
            <Text style={styles.balanceText}>12000</Text>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color="#FF0000" />
          </Pressable>
        </View>
      </View>

      {/* Brand Logo Section */}
      <View style={styles.brandSection}>
        <Image 
          source={require("../assets/networks/2.png")}
          style={styles.brandLogo}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Brand Info Section */}
        <View style={styles.brandInfoSection}>
          <View style={styles.brandHeader}>
            <View style={styles.brandTitleContainer}>
              <Image 
                source={require("../assets/networks/airtel-small.png")}
                style={styles.smallLogo}
              />
              <Text style={styles.brandName}>Airtel</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#8A2BE2" />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Phone Number Input */}
          <View style={styles.phoneNumberSection}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputRow}>
              <View style={styles.phoneInput}>
                <Image 
                  source={require("../assets/nigeria-flag.png")}
                  style={styles.flag}
                />
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  style={styles.input}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                />
                <Pressable onPress={() => setPhoneNumber('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </Pressable>
              </View>
              <Pressable style={styles.contactButton}>
                <Ionicons name="people" size={24} color="#8A2BE2" />
              </Pressable>
            </View>
          </View>

          {/* Quick Amount Selection */}
          <View style={styles.quickAmounts}>
            {quickAmounts.map((quickAmount) => (
              <Pressable
                key={quickAmount}
                style={[
                  styles.amountButton,
                  amount === quickAmount && styles.selectedAmount
                ]}
                onPress={() => setAmount(quickAmount)}
              >
                <Text style={[
                  styles.amountButtonText,
                  amount === quickAmount && styles.selectedAmountText
                ]}>₦{quickAmount}</Text>
              </Pressable>
            ))}
          </View>

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInput}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter amount"
              />
            </View>
          </View>

          {/* Total Price */}
          <View style={styles.totalPriceSection}>
            <Text style={styles.totalPriceLabel}>Total Price:</Text>
            <View style={styles.priceContainer}>
              <Image 
                source={require("../assets/icons/coin.png")}
                style={[styles.coinIcon, { width: 24, height: 24 }]}
              />
              <Text style={styles.priceText}>{amount}</Text>
            </View>
          </View>

          {/* Purchase Button */}
          <Pressable 
                      style={[
                        styles.purchaseButton,
                        (!phoneNumber || !amount) && styles.purchaseButtonDisabled
                      ]}
                      onPress={handlePurchase}
                      disabled={!phoneNumber || !amount}
                    >
                      <Text style={styles.purchaseButtonText}>Purchase</Text>
                    </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
  headerBackground: {
    backgroundColor: '#F5F5F5',
    paddingTop: 44,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    width: 28,
    height: 28,
    backgroundColor: '#333333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  heartButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandInfoSection: {
    padding: 20,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallLogo: {
    width: 32,
    height: 32,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '500',
  },
  aboutSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    height: 52, // Fixed height
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneNumberSection: {
    marginBottom: 24,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 52, // Fixed height
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    padding: 0, // Remove default padding
  },
  contactButton: {
    width: 52, // Square button
    height: 52, // Same height as input
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
  durationTabs: {
    marginBottom: 32,
    // Remove paddingHorizontal from here since it's already in formSection
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#F8F0FF',
    height: 44,
  },
  selectedTab: {
    backgroundColor: '#8A2BE2',
  },
  tabText: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  purchaseButton: {
    margin: 24,
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  brandSection: {
    backgroundColor: '#FFF5F5', // Light red/pink background for Airtel
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
  },
  brandLogo: {
    width: 298.67,
    height: 140,
    resizeMode: 'contain',
  },

  scrollContainer: {
    flex: 1,
  },


  subscriptionPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planHeaderLeft: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  planHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  planSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
  },

  planText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dropdownIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  priceText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  planOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  planOptionText: {
    fontSize: 16,
    color: '#333',
  },
  planOptionPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8A2BE2',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#8A2BE2',
    borderRadius: 28,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  planSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 24,
  },
  amountButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#F8F0FF',
    borderRadius: 24,
  },
  selectedAmount: {
    backgroundColor: '#8A2BE2',
  },
  amountButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedAmountText: {
    color: '#FFFFFF',
  },
  amountSection: {
    marginBottom: 24,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 52,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
});