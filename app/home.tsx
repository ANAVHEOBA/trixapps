import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { TokenManager } from './utilities/tokenManager';
import { ApiClient } from './utilities/apiClient';
import { Ionicons } from '@expo/vector-icons';

// Default images
const DEFAULT_AVATAR = require("../assets/default-avatar.png");
const WALLET_ICON = require("../assets/wallet-icon.png");
const DEFAULT_SERVICE_ICON = require("../assets/default-service-icon.png");
const DEFAULT_TRANSACTION_ICON = require("../assets/default-transaction-icon.png");
const NAIRA_ICON = require("../assets/naira-icon.png");

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: string;
  icon: string | null;
}

interface DigitalService {
  id: string;
  name: string;
  icon: string | null;
  category: string;
}

export default function HomeScreen() {
  const [balance, setBalance] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [services, setServices] = useState<DigitalService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showBalance, setShowBalance] = useState(true);



  // Add these functions after your state declarations and before the useEffect

const getImageSource = (uri: string | null, defaultImage: any) => {
  if (!uri) return defaultImage;
  try {
    return { uri };
  } catch (error) {
    return defaultImage;
  }
};

const loadInitialData = async () => {
  try {
    setIsLoading(true);
    await Promise.all([
      loadUserData(),
      loadBalance(),
      loadTransactions(),
      loadDigitalServices()
    ]);
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    setIsLoading(false);
  }
};

const loadUserData = async () => {
  try {
    const user = await TokenManager.getUserData();
    setUserData(user);
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};

const loadBalance = async () => {
  try {
    const response = await ApiClient.get('/wallet/balance');
    if (response.success) {
      setBalance(parseFloat(response.data.balance));
    }
  } catch (error) {
    console.error('Error loading balance:', error);
  }
};

const loadTransactions = async () => {
  try {
    const response = await ApiClient.get('/transactions/recent');
    if (response.success) {
      setTransactions(response.data.transactions);
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
  }
};

const loadDigitalServices = async () => {
  try {
    const response = await ApiClient.get('/services/digital');
    if (response.success) {
      setServices(response.data.services);
    }
  } catch (error) {
    console.error('Error loading digital services:', error);
  }
};

const filteredServices = services.filter(service => 
  activeFilter === 'All' || service.category === activeFilter
);

  useEffect(() => {
    loadInitialData();
  }, []);

  // ... keep all your existing load functions ...

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile and Wallet */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/profile")}>
          <Image 
            source={getImageSource(userData?.avatar, DEFAULT_AVATAR)}
            style={styles.avatar}
          />
        </Pressable>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        <Pressable 
          style={styles.walletButton}
          onPress={() => router.push("/wallet")}
        >
          <Image 
            source={WALLET_ICON}
            style={styles.walletIcon}
          />
        </Pressable>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Pressable 
          style={styles.balanceHeader}
          onPress={() => setShowBalance(!showBalance)}
        >
          <Text style={styles.balanceLabel}>Balance</Text>
          <Ionicons 
            name={showBalance ? "chevron-down" : "chevron-forward"} 
            size={20} 
            color="#FFF" 
          />
        </Pressable>
        <View style={styles.balanceBox}>
          <View style={styles.balanceAmountContainer}>
            <Image source={NAIRA_ICON} style={styles.nairaIcon} />
            <Text style={styles.balanceText}>
              {showBalance ? balance?.toLocaleString() || '0' : '****'}
            </Text>
          </View>
          <Pressable 
            style={styles.addButton}
            onPress={() => router.push("/add-funds")}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Trix 101 Card */}
      <View style={styles.trixCard}>
        <Text style={styles.trixTitle}>Trix 101</Text>
        <Text style={styles.trixDescription}>
          Get rewarded for the things you love, because you deserve more.
        </Text>
        <Pressable 
          style={styles.learnMoreButton}
          onPress={() => router.push("/learn-more")}
        >
          <Text style={styles.learnMoreText}>Learn more</Text>
        </Pressable>
      </View>

      {/* Digital Services Section */}
      <View style={styles.servicesSection}>
        <Pressable 
          style={styles.sectionHeader}
          onPress={() => router.push("/DigitalServicesScreen")}
        >
          <Text style={styles.sectionTitle}>Digital Services</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </Pressable>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterTabs}
          contentContainerStyle={styles.filterTabsContent}
        >
          {['All', 'Subscriptions', 'Gift Cards', 'Recharge Card'].map((filter) => (
            <Pressable 
              key={filter}
              style={[styles.filterTab, activeFilter === filter && styles.activeTab]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Service Cards Grid */}
        <View style={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <Pressable 
              key={service.id}
              style={styles.serviceCard}
              onPress={() => router.push(`/services/${service.name.toLowerCase()}`)}
            >
              <Image 
                source={getImageSource(service.icon, DEFAULT_SERVICE_ICON)}
                style={styles.serviceIcon}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Pressable onPress={() => router.push("/transactions")}>
            <Text style={styles.viewAllText}>View all</Text>
          </Pressable>
        </View>
        
        {transactions.length === 0 ? (
          <Text style={styles.noTransactions}>No recent transactions</Text>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Image 
                  source={getImageSource(transaction.icon, DEFAULT_TRANSACTION_ICON)}
                  style={styles.transactionIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount < 0 ? '#FF4444' : '#4CAF50' }
                ]}>
                  {transaction.amount < 0 ? '-' : '+'}₦{Math.abs(transaction.amount).toLocaleString()}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { color: transaction.status.toLowerCase() === 'completed' ? '#4CAF50' : '#FFA500' }
                ]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    backgroundColor: '#FFF',
  },
  walletButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  walletIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  
  // Balance Section
  balanceContainer: {
    padding: 16,
    paddingTop: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  balanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nairaIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    tintColor: '#FFF',
  },
  balanceText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },

  // Trix Card
  trixCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trixTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  trixDescription: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontSize: 14,
  },

  // Services Section
  servicesSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  filterTabs: {
    marginBottom: 20,
  },
  filterTabsContent: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  serviceCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  serviceIcon: {
    width: '60%',
    height: '60%',
    tintColor: '#FFF',
  },

  // Transactions Section
  transactionsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 32,
  },
  viewAllText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#8A2BE2',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#666',
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 12,
  },
  noTransactions: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
  },
});