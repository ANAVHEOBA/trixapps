import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput, Modal } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%', // Changed from fixed 428
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
    paddingTop: 24,
    paddingBottom: 16,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },


  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    padding: 16,
    backgroundColor: '#FFFFFF',
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
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    width: '100%', // Add this to make form take full width
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
    width: '100%', // Changed from fixed 382
    height: 56,
    backgroundColor: '#8A2BE2',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center', // Add this to center the button
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  brandSection: {
    paddingTop: 24,
    paddingBottom: 16,
  },

  brandLogo: {
    width: 382,
    height: 32,
    resizeMode: 'contain',
  },

  smallLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 23, // (428 - 382) / 2 to center content
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
    flex: 1, // Changed from fixed width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
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

  planSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  meterSection: {
    marginBottom: 24,
    width: '100%',
  },
  
  meterInputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  
  meterInput: {
    flex: 1, // Changed from fixed width
    height: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  
  validatedName: {
    marginTop: 8,
    color: '#8A2BE2',
    fontSize: 14,
  },

  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8, // Add gap between buttons
  },

  amountButton: {
    flex: 1, // Make buttons take equal space
    height: 44,
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedAmount: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },

  amountButtonText: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '500',
  },

   selectedAmountText: {
    color: '#FFFFFF',
  },

  amountSection: {
    marginBottom: 24,
  },

  amountInput: {
    flex: 1, // Changed from fixed width
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
  },

  currencySymbol: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },

  disabledButton: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },


  mainContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16, // Reduced from 23
  },


  brandBanner: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center', // Add this
  },
  
  // Large BEDC logo in banner
  bannerLogo: {
    width: '90%', // Increased from previous size
    height: 90, // Increased height
    resizeMode: 'contain',
  },

  meterTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 52,
  },

  meterTypeText: {
    fontSize: 16,
    color: '#333',
  },


  contentContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center', // Add this to center content
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

  providerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  providerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  providerName: {
    fontSize: 16,
    color: '#333',
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



  


});

interface MeterPlan {
  plan_code: string;
  name: string;
  amount: number;
  category: string;
}


const ELECTRICITY_PROVIDERS = [
  { name: 'Ikeja Electric', shortName: 'ikedc', logo: require('../assets/electricity/ikedc-logo.png') },
  { name: 'Abuja Electric', shortName: 'aedc', logo: require('../assets/electricity/aedc-logo.png') },
  { name: 'Enugu Disco', shortName: 'eedc', logo: require('../assets/electricity/eedc-logo.png') },
  { name: 'Eko Electric', shortName: 'ekedc', logo: require('../assets/electricity/ekedc-logo.jpg') },
  { name: 'Ibadan Electric', shortName: 'ibedc', logo: require('../assets/electricity/ibedc-logo.png') },
  { name: 'Porthacourt Electric', shortName: 'phedc', logo: require('../assets/electricity/phedc-logo.png') },
  { name: 'Kaduna Disco', shortName: 'kaduna', logo: require('../assets/electricity/kaduna-logo.jpeg') },
  { name: 'Kano Disco', shortName: 'kano', logo: require('../assets/electricity/kano-logo.png') },
  { name: 'Jos Disco', shortName: 'jed', logo: require('../assets/electricity/jed-logo.jpeg') },
  { name: 'Aba Disco', shortName: 'aba', logo: require('../assets/electricity/aba-logo.png') },
  { name: 'Benin Disco', shortName: 'bedc', logo: require('../assets/electricity/bedc-logo.png') },
];

export default function ElectricityScreen() {
  // State declarations
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [validatedMeter, setValidatedMeter] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  const quickAmounts = ['1000', '2000', '5000', '10000'];
  const [selectedProvider, setSelectedProvider] = useState(ELECTRICITY_PROVIDERS[10]);

  // Handle provider selection
  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setShowProviderModal(false);
    setValidatedMeter(null);
    setMeterNumber('');
  };

  // Validate meter number
  const validateMeter = async () => {
    if (!meterNumber) return;
    
    setIsValidating(true);
    try {
      const response = await ApiClient.get(
        `/payscribe/electricity/validate?meter_number=${meterNumber}&provider=${selectedProvider.shortName}`
      );
      if (response.success) {
        setValidatedMeter(response.data);
      }
    } catch (error) {
      console.error('Error validating meter:', error);
      setValidatedMeter(null);
    } finally {
      setIsValidating(false);
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
            <Ionicons name="heart-outline" size={24} color="#8A2BE2" />
          </Pressable>
        </View>
      </View>

      {/* Brand Banner */}
      <View style={styles.brandBanner}>
        <Image 
          source={selectedProvider.logo}
          style={styles.bannerLogo}
        />
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Brand Info */}
          <View style={styles.brandInfoSection}>
            <View style={styles.brandHeader}>
              <View style={styles.brandTitleContainer}>
                <Image 
                  source={selectedProvider.logo}
                  style={styles.smallLogo}
                />
                <Text style={styles.brandName}>{selectedProvider.name}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#8A2BE2" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </View>

            {/* About Section */}
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>About {selectedProvider.name}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {selectedProvider.name} is committed to providing reliable power supply
                to homes and businesses across Nigeria.
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Provider Selection */}
            <View style={styles.meterSection}>
              <Text style={styles.label}>Select Provider</Text>
              <Pressable 
                style={styles.meterTypeSelector}
                onPress={() => setShowProviderModal(true)}
              >
                <Text style={styles.meterTypeText}>{selectedProvider.name}</Text>
                <Ionicons name="chevron-down" size={24} color="#8A2BE2" />
              </Pressable>
            </View>

            {/* Meter Number */}
            <View style={styles.meterSection}>
              <Text style={styles.label}>Meter Number</Text>
              <TextInput
                value={meterNumber}
                onChangeText={setMeterNumber}
                style={styles.meterInput}
                placeholder="Enter meter number"
                keyboardType="numeric"
                onBlur={validateMeter}
              />
              {validatedMeter && (
                <Text style={styles.validatedName}>
                  Customer Name: {validatedMeter.name}
                </Text>
              )}
            </View>

            {/* Quick Amount Selection */}
            <View style={styles.meterSection}>
              <Text style={styles.label}>Select Amount</Text>
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
            </View>

            {/* Custom Amount Input */}
            <View style={styles.amountSection}>
              <Text style={styles.label}>Or Enter Amount</Text>
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
                  style={styles.coinIcon}
                />
                <Text style={styles.priceText}>₦{amount || '0'}</Text>
              </View>
            </View>

            {/* Purchase Button */}
            <Pressable 
              style={[
                styles.purchaseButton,
                (!meterNumber || !amount || !validatedMeter) && styles.disabledButton
              ]}
              disabled={!meterNumber || !amount || !validatedMeter}
              onPress={() => router.push('/payment-confirmation')}
            >
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Provider Selection Modal */}
      <Modal
        visible={showProviderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProviderModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Provider</Text>
            <ScrollView>
              {ELECTRICITY_PROVIDERS.map((provider) => (
                <Pressable
                  key={provider.shortName}
                  style={styles.providerOption}
                  onPress={() => handleProviderSelect(provider)}
                >
                  <View style={styles.providerInfo}>
                    <Image 
                      source={provider.logo}
                      style={styles.providerLogo}
                    />
                    <Text style={styles.providerName}>{provider.name}</Text>
                  </View>
                  {selectedProvider.shortName === provider.shortName && (
                    <Ionicons name="checkmark-circle" size={24} color="#8A2BE2" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowProviderModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}