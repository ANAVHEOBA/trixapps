import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput, Modal } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
  
    accountSection: {
      marginBottom: 24,
    },
    accountInput: {
        flex: 1,
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
    disabledButton: {
      backgroundColor: '#CCCCCC',
      opacity: 0.7,
    },
  
    providerOption: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    providerOptionText: {
      fontSize: 16,
      color: '#333',
    },
  
    brandSection: {
      backgroundColor: '#F5F5F5',
      width: '100%',
      paddingVertical: 30,
      alignItems: 'center',
      position: 'relative',
    },

  
  
    smallLogo: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
  
    ratingText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#8A2BE2',
    },
  
    providerLogo: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
  
    dropdownContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  
  
    providerOptionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  
    providerOptionLogo: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
    },
  
    accountInputContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
      },
  });

interface BettingProvider {
  id: string;
  title: string;
  active: boolean;
  logo: any; // For the small logo
  brandImage: any; // For the large banner image
}

interface ValidationResponse {
  name: string;
  account: string;
}


const providersData = [
    {
      id: 'supabet',
      title: 'SupaBet',
      active: true,
      logo: require('../assets/betting/supabet-logo.png'),
      brandImage: require('../assets/betting/supabet-banner.png'),
    },
    {
      id: 'sportybet',
      title: 'SportyBet',
      active: true,
      logo: require('../assets/betting/sportybet-logo.png'),
      brandImage: require('../assets/betting/sportybet-banner.png'),
    },
    {
      id: 'paripesa',
      title: 'Paripesa',
      active: true,
      logo: require('../assets/betting/paripesa-logo.png'),
      brandImage: require('../assets/betting/paripesa-banner.webp'),
    },
    {
      id: 'onexbet',
      title: 'One X Bet',
      active: true,
      logo: require('../assets/betting/onexbet-logo.png'),
      brandImage: require('../assets/betting/onexbet-banner.png'),
    },
    {
      id: 'nairabet',
      title: 'Naira Bet',
      active: true,
      logo: require('../assets/betting/nairabet-logo.png'),
      brandImage: require('../assets/betting/nairabet-banner.jpg'),
    },
    {
      id: 'naijabet',
      title: 'Naija Bet',
      active: true,
      logo: require('../assets/betting/naijabet-logo.jpeg'),
      brandImage: require('../assets/betting/naijabet-banner.png'),
    },
    {
      id: 'mylottohub',
      title: 'MyLotto Hub',
      active: true,
      logo: require('../assets/betting/mylottohub-logo.png'),
      brandImage: require('../assets/betting/mylottohub-banner.png'),
    },
    {
      id: 'mssport',
      title: 'MsSport',
      active: true,
      logo: require('../assets/betting/mssport-logo.png'),
      brandImage: require('../assets/betting/mssport-banner.png'),
    },
    {
      id: 'merrybet',
      title: 'MerryBet',
      active: true,
      logo: require('../assets/betting/merrybet-logo.png'),
      brandImage: require('../assets/betting/merrybet-banner.png'),
    },
    {
      id: 'betway',
      title: 'BetWay',
      active: true,
      logo: require('../assets/betting/betway-logo.jpg'),
      brandImage: require('../assets/betting/betway-banner.png'),
    },
    {
      id: 'betking',
      title: 'BetKing',
      active: true,
      logo: require('../assets/betting/betking-logo.jpg'),
      brandImage: require('../assets/betting/betking-banner.jpeg'),
    },
    {
      id: 'bet9ja',
      title: 'Bet9ja',
      active: true,
      logo: require('../assets/betting/bet9ja-logo.png'),
      brandImage: require('../assets/betting/bet9ja-banner.png'),
    },
    {
      id: 'bangbet',
      title: 'BangBet',
      active: true,
      logo: require('../assets/betting/bangbet-logo.png'),
      brandImage: require('../assets/betting/bangbet-banner.png'),
    }
];

export default function BettingScreen() {
    // State declarations
    const [selectedProvider, setSelectedProvider] = useState<BettingProvider | null>(null);
    const [providers, setProviders] = useState<BettingProvider[]>([]);
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [showProviderModal, setShowProviderModal] = useState(false);
    const [validatedUser, setValidatedUser] = useState<ValidationResponse | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const quickAmounts = ['100', '200', '500', '1000', '2000', '5000'];
  
    // Fetch betting providers when component mounts
    useEffect(() => {
      fetchBettingProviders();
    }, []);
  
    
      const fetchBettingProviders = async () => {
        try {
          const response = await ApiClient.get('/payscribe/betting/providers');
          if (response.success) {
            // Map the API response to include the static images from providersData
            const providersWithImages = response.data.map((provider: any) => {
              const staticProvider = providersData.find(p => p.id === provider.id);
              return {
                ...provider,
                logo: staticProvider?.logo || providersData[0].logo, // Default to first provider if not found
                brandImage: staticProvider?.brandImage || providersData[0].brandImage,
              };
            });
            setProviders(providersWithImages);
          }
        } catch (error) {
          console.error('Error fetching betting providers:', error);
          // Fallback to static data if API fails
          setProviders(providersData);
        }
      };
  
    const validateAccount = async () => {
      if (!selectedProvider || !accountId) return;
      
      setIsValidating(true);
      try {
        const response = await ApiClient.get(
          `/payscribe/betting/validate?bet_id=${selectedProvider.id}&customer_id=${accountId}`
        );
        if (response.success) {
          setValidatedUser(response.data);
        } else {
          setValidatedUser(null);
        }
      } catch (error) {
        console.error('Error validating account:', error);
        setValidatedUser(null);
      } finally {
        setIsValidating(false);
      }
    };
  
    // Single return statement
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
  
        {/* Brand Section */}
        <View style={styles.brandSection}>
          <Image 
            source={selectedProvider ? selectedProvider.brandImage : require('../assets/betting/sportybet-banner.png')}
            style={styles.brandLogo}
          />
          <View style={styles.ratingContainer}>
            <Image 
              source={selectedProvider ? selectedProvider.logo : require('../assets/betting/sportybet-logo.png')}
              style={styles.smallLogo}
            />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
  
        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.formSection}>
            {/* Provider Selection */}
            <Text style={styles.label}>Select Betting Provider</Text>
            <Pressable 
              style={styles.dropdownButton}
              onPress={() => setShowProviderModal(true)}
            >
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownText}>
                  {selectedProvider ? selectedProvider.title : 'Select Provider'}
                </Text>
                {selectedProvider ? (
                  <Image 
                    source={selectedProvider.logo}
                    style={styles.providerLogo}
                  />
                ) : (
                  <View style={styles.dropdownIcon}>
                    <Ionicons name="chevron-down" size={16} color="#8A2BE2" />
                  </View>
                )}
              </View>
            </Pressable>
  
            {/* Account ID Input */}
            <View style={styles.accountSection}>
              <Text style={styles.label}>Account ID</Text>
              <View style={styles.accountInputContainer}>
                <TextInput
                  value={accountId}
                  onChangeText={setAccountId}
                  style={styles.accountInput}
                  placeholder="Enter your betting account ID"
                  onBlur={validateAccount}
                />
              </View>
              {validatedUser && (
                <Text style={styles.validatedName}>
                  Account Name: {validatedUser.name}
                </Text>
              )}
            </View>
  
            {/* Amount Selection */}
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
  
            {/* Purchase Button */}
            <Pressable 
  style={[
    styles.purchaseButton,
    (!selectedProvider || !accountId || !amount || !validatedUser) 
      ? styles.disabledButton 
      : { backgroundColor: '#8A2BE2' } // Purple when validated
  ]}
  disabled={!selectedProvider || !accountId || !amount || !validatedUser}
  onPress={() => router.push('/payment-confirmation')}
>
  <Text style={styles.purchaseButtonText}>Purchase</Text>
</Pressable>
          </View>
        </ScrollView>
  
        {/* Provider Selection Modal */}
        <Modal
          visible={showProviderModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowProviderModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Betting Provider</Text>
              <ScrollView>
                {providers.map((provider) => (
                  <Pressable
                    key={provider.id}
                    style={styles.providerOption}
                    onPress={() => {
                      setSelectedProvider(provider);
                      setShowProviderModal(false);
                      setAccountId('');
                      setValidatedUser(null);
                    }}
                  >
                    <View style={styles.providerOptionContent}>
                      <Text style={styles.providerOptionText}>{provider.title}</Text>
                      <Image 
                        source={provider.logo}
                        style={styles.providerOptionLogo}
                      />
                    </View>
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