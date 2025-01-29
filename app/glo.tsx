import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput, Modal } from "react-native";
import { router, Href } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    backgroundColor: '#E6F4EB', // Light red/pink background for Airtel
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

  


});

interface Plan {
  plan_code: string;
  name: string;
  amount: number;
  category: string;
  alias: string;
}


  interface SubscriptionType {
  id: string;
  name: string;
  route: string; 
}


export default function GloScreen() {



    const subscriptionTypes: SubscriptionType[] = [
        { 
            id: 'data',
            name: 'Data Subscription',
            route: '/glo'
          },
          { 
            id: 'airtime',
            name: 'Airtime Purchase',
            route: '/glo-airtime'
          }
        ];


    const [selectedTab, setSelectedTab] = useState('Daily');
  const [phoneNumber, setPhoneNumber] = useState('816 000 2000');
  const [subscriptionType, setSubscriptionType] = useState(subscriptionTypes[0].name);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);




    const CACHE_KEY = 'glo_plans_cache';
    const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds
    
    const loadCachedPlans = async () => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          return data;
        }
      } catch (error) {
        console.error('Error loading cache:', error);
      }
      return null;
    };
    
    
    const saveCachedPlans = async (plans: Plan[]) => {
      try {
        const cacheData = {
          timestamp: Date.now(),
          data: plans
        };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (error) {
        console.error('Error saving cache:', error);
      }
    };
    
    
    
    
        // Fetch plans when component mounts
      useEffect(() => {
        fetchDataPlans();
      }, []);
    
      // Filter plans when tab changes
      useEffect(() => {
        filterPlansByDuration(selectedTab);
      }, [selectedTab, plans]);
    
      // Updated fetchDataPlans function
      const fetchDataPlans = async () => {
        setIsLoading(true);
        try {
          // Check cache first
          const cachedPlans = await loadCachedPlans();
          if (cachedPlans) {
            setPlans(cachedPlans);
            if (cachedPlans.length > 0) {
              setSelectedPlan(cachedPlans[0]);
            }
            return;
          }
      
          const response = await ApiClient.get('/payscribe/data/plans?network=glo');
          if (response.success && response.data.plans) {
            // The plans are directly in response.data.plans
            const newPlans = response.data.plans;
            setPlans(newPlans);
            saveCachedPlans(newPlans);
            
            if (newPlans.length > 0) {
              setSelectedPlan(newPlans[0]);
            }
          }
        } catch (error) {
          console.error('Error fetching plans:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      // Update the Plan interface to match the API response
      interface Plan {
        plan_code: string;
        name: string;
        category: string;
        alias: string;
        amount: number;
      }
      
      // Update the filterPlansByDuration function to better match plan names
      const filterPlansByDuration = (duration: string) => {
        let filtered = plans.filter(plan => {
          const name = plan.name.toLowerCase();
          switch (duration) {
            case 'Daily':
              return name.includes('1 day') || name.includes('daily') || name.includes('24 hours');
            case 'Weekly':
              return name.includes('7 days') || name.includes('week') || name.includes('14 days');
            case 'Monthly':
              return name.includes('30 days') || name.includes('month') || name.includes('30days');
            case 'Yearly':
              return name.includes('365') || name.includes('year') || name.includes('annual');
            default:
              return true;
          }
        });
        
        // Sort plans by amount
        filtered = filtered.sort((a, b) => a.amount - b.amount);
        
        setFilteredPlans(filtered);
        if (filtered.length > 0) {
          setSelectedPlan(filtered[0]);
        } else {
          setSelectedPlan(null);
        }
      };


  // Plan selection modal
  const PlanSelectionModal = () => (
    <Modal
      visible={showPlanModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPlanModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Plan</Text>
          <ScrollView>
            {filteredPlans.map((plan) => (
              <Pressable
                key={plan.plan_code}
                style={styles.planOption}
                onPress={() => {
                  setSelectedPlan(plan);
                  setShowPlanModal(false);
                }}
              >
                <Text style={styles.planOptionText}>{plan.name}</Text>
                <Text style={styles.planOptionPrice}>{plan.amount}</Text>
              </Pressable>
            ))}

</ScrollView>
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowPlanModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );


   const SubscriptionTypeModal = () => (
    <Modal
      visible={showSubscriptionModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowSubscriptionModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Subscription Type</Text>
          <ScrollView>
            {subscriptionTypes.map((type) => (
              <Pressable
                key={type.id}
                style={styles.planOption}
                onPress={() => {
                  if (type.name === 'Airtime Purchase') {
                    router.push(type.route as any); // Add type assertion here if needed
                  } else {
                    setSubscriptionType(type.name);
                    setShowSubscriptionModal(false);
                  }
                }}
              >
                <Text style={styles.planOptionText}>{type.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

            <Pressable
            style={styles.closeButton}
            onPress={() => setShowSubscriptionModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
  
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
            source={require("../assets/networks/33.png")}
            style={styles.brandLogo}
          />
        </View>
  
        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Brand Info Section */}
          <View style={styles.brandInfoSection}>
            <View style={styles.brandHeader}>
              <View style={styles.brandTitleContainer}>
                <Image 
                  source={require("../assets/networks/glo.png")}
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
  
          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About Glo</Text>
            <Text style={styles.description}>
              Glo is one of Africa's leading mobile network providers, offering reliable connectivity 
              and data services. With extensive coverage and competitive rates, we keep you connected 
              to what matters most.
            </Text>
          </View>
  
          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Subscription Type</Text>
            <Pressable 
                         style={styles.dropdownButton}
                  onPress={() => setShowSubscriptionModal(true)}
                       >
                 <Text style={styles.dropdownText}>{subscriptionType}</Text>
                <View style={styles.dropdownIcon}>
             <Ionicons name="chevron-down" size={16} color="#8A2BE2" />
             </View>
           </Pressable>
  
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
  
            {/* Duration Tabs */}
  <View style={styles.durationTabs}>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }} // Add right padding for last tab
    >
      {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tab) => (
        <Pressable
          key={tab}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.selectedTab
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[
            styles.tabText,
            selectedTab === tab && styles.selectedTabText
          ]}>{tab}</Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
  
           
 {/* Plan Selection */}
 <View style={styles.planSection}>
        <View style={styles.subscriptionPlanHeader}>
          <Text style={styles.planHeaderLeft}>Subscription Plan</Text>
          <View style={styles.planHeaderRight}>
            <Image 
              source={require("../assets/icons/coin.png")}
              style={[styles.coinIcon, { width: 20, height: 20 }]}
            />
            <Text style={styles.priceText}>
              {selectedPlan ? selectedPlan.amount : 0}
            </Text>
          </View>
        </View>

        <Pressable 
          style={styles.planSelector}
          onPress={() => setShowPlanModal(true)} // Make sure this is called
        >
          <Text style={styles.planText}>
            {selectedPlan ? selectedPlan.name : 'Select a plan'}
          </Text>
          <View style={styles.dropdownIconContainer}>
            <Ionicons name="chevron-down" size={16} color="#8A2BE2" />
          </View>
        </Pressable>
      </View>
  
            {/* Total Price */}
            <View style={styles.totalPriceSection}>
  <Text style={styles.totalPriceLabel}>Total Price:</Text>
  <View style={styles.priceContainer}>
    <Image 
      source={require("../assets/icons/coin.png")}
      style={[styles.coinIcon, { width: 24, height: 24 }]}
    />
    <Text style={styles.priceText}>
      {selectedPlan ? selectedPlan.amount : 0}
    </Text>
  </View>
</View>
  
            {/* Purchase Button */}
            <Pressable 
              style={styles.purchaseButton}
              onPress={() => {
                if (selectedPlan && phoneNumber) {
                  router.push({
                    pathname: '/summary',
                    params: {
                      provider: 'Glo',
                      subscriptionType: subscriptionType,
                      phoneNumber: phoneNumber,
                      plan: selectedPlan.name,
                      amount: selectedPlan.amount.toString(),
                      planCode: selectedPlan.plan_code,
                      type: 'data' // or 'airtime'
                    }
                  });
                }
              }}
            >
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </Pressable>
          </View>
        </ScrollView>

        <Modal
        visible={showPlanModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPlanModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Plan</Text>
            <ScrollView>
              {filteredPlans.map((plan) => (
                <Pressable
                  key={plan.plan_code}
                  style={styles.planOption}
                  onPress={() => {
                    setSelectedPlan(plan);
                    setShowPlanModal(false);
                  }}
                >
                  <Text style={styles.planOptionText}>{plan.name}</Text>
                  <Text style={styles.planOptionPrice}>{plan.amount}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowPlanModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <PlanSelectionModal />
    <SubscriptionTypeModal />
    </View>
  );
}