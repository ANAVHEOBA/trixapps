import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';

// Constants
const PROVIDERS = [
  { 
    id: '1', 
    name: 'Airtel', 
    logo: require('../assets/networks/airtel.png'),
    backgroundColor: '#FF0000' // Airtel red
  },
  { 
    id: '2', 
    name: 'MTN', 
    logo: require('../assets/networks/mtn.png'),
    backgroundColor: '#FFD700' // MTN yellow
  },
  { 
    id: '3', 
    name: 'Glo', 
    logo: require('../assets/networks/glo.png'),
    backgroundColor: '#008000' // Glo green
  },
  { 
    id: '4', 
    name: '9mobile', 
    logo: require('../assets/networks/9mobile.png'),
    backgroundColor: '#006400' // 9mobile dark green
  },


  {
    id: '5',
    name: 'Betting',
    logo: require('../assets/services/betting.png'),
    backgroundColor: '#4CAF50' // Green
  },
  {
    id: '6',
    name: 'Electricity',
    logo: require('../assets/services/electricity.png'),
    backgroundColor: '#FFC107' // Amber
  },
  {
    id: '7',
    name: 'DSTV',
    logo: require('../assets/services/dstv.png'),
    backgroundColor: '#2196F3' // Blue
  },
  {
    id: '8',
    name: 'GOtv',
    logo: require('../assets/services/gotv.png'),
    backgroundColor: '#3F51B5' // Indigo
  },


  {
    id: '9',
    name: 'StarTimes',
    logo: require('../assets/services/startimes.png'),
    backgroundColor: '#E91E63' // Pink
  },
  {
    id: '10',
    name: 'WAEC',
    logo: require('../assets/services/waec.png'),
    backgroundColor: '#9C27B0' // Purple
  }
];


const TABS = [
  'All', 
  'Subscriptions', 
  'Gift Cards', 
  'Recharge Card',
  'Betting',
  'Utilities',
  'Cable TV'
];

interface Transaction {
  id: string;
  icon: any;
  title: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending';
}




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8A2BE2',
    },
    
    // Header Styles
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    dotIndicator: {
      flexDirection: 'row',
      gap: 5,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    activeDot: {
      backgroundColor: '#fff',
    },
    walletIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    walletIcon: {
      width: 24,
      height: 24,
    },
  
    // Balance Section
    balanceWrapper: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    balanceLabel: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 12,
    },
    balanceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#000000',
      width: 169,
      height: 56,
      borderRadius: 28,
      paddingHorizontal: 8,
    },
    balanceLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    coinIcon: {
      width: 28,
      height: 28,
    },
    balanceText: {
      color: '#fff',
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
      color: '#fff',
      fontSize: 20,
      fontWeight: '500',
    },
  
    // Main Container
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 20,
      paddingBottom: 100, // Add extra padding at bottom
      minHeight: '100%', // Ensure it fills the entire height
    },
  
    // Digital Services Section
    servicesSection: {
      padding: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000',
    },
  
    // Tabs
    tabsScroll: {
      marginBottom: 20,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
      marginRight: 10,
    },
    activeTab: {
      backgroundColor: '#8A2BE2',
    },
    tabText: {
      color: '#666',
      fontSize: 14,
    },
    activeTabText: {
      color: '#fff',
    },
  
    // Service Providers

    providerCard: {
      width: 108,
      height: 68,
      borderRadius: 12,
      marginRight: 15,
      marginBottom: 15, // Add margin bottom for multiple rows
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },


    providerLogo: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
    },

    providersScroll: {
      marginBottom: 20,
      paddingHorizontal: 20,
      paddingBottom: 10, // Add padding to show all items
    },
  
    // Transactions Section
    transactionsSection: {
      padding: 20,
      paddingTop: 0,
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
    },
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
      marginBottom: 4,
    },
    transactionDate: {
      fontSize: 12,
      color: '#666',
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FF4444',
      marginBottom: 4,
    },
    transactionStatus: {
      fontSize: 12,
      color: '#4CAF50',
    },
  });

  

interface Transaction {
  id: string;
  icon: any;
  title: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending';
}

export default function HomeScreen() {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      icon: require('../assets/twitch-icon.png'),
      title: 'Product Payment',
      date: 'Payment Date',
      amount: -12000,
      status: 'Completed'
    },
    {
      id: '2',
      icon: require('../assets/twitch-icon.png'),
      title: 'Product Payment',
      date: 'Payment Date',
      amount: -12000,
      status: 'Completed'
    }
  ]);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const response = await ApiClient.get('/wallet/balance');
      if (response.success) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBalance = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" color="#FFFFFF" />;
    }
    
    if (!showBalance) {
      return <Text style={styles.balanceText}>****</Text>;
    }

    return (
      <Text style={styles.balanceText}>
        {balance?.toLocaleString() ?? '0'}
      </Text>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/profile-pic.png')} 
          style={styles.profilePic}
        />
        <View style={styles.dotIndicator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        <View style={styles.walletIconContainer}>
          <Image 
            source={require('../assets/icons/wallet.png')}
            style={styles.walletIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceWrapper}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Pressable 
          style={styles.balanceContainer}
          onPress={() => setShowBalance(!showBalance)}
        >
          <View style={styles.balanceLeft}>
            <Image 
              source={require('../assets/icons/coin.png')}
              style={styles.coinIcon}
            />
            {renderBalance()}
          </View>
          <Pressable 
            style={styles.addButton}
            onPress={() => router.push('/add-funds')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </Pressable>
      </View>

      {/* Main Content Container */}
      <View style={styles.mainContainer}>
        {/* Digital Services Section */}
        <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Digital Services</Text>
  <Pressable onPress={() => router.push('/DigitalServicesScreen')}>
    <Ionicons name="chevron-forward" size={24} color="#000" />
  </Pressable>
</View>

          {/* Service Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScroll}
          >
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Service Providers */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.providersScroll}
          >
            {PROVIDERS.map((provider) => (
              <Pressable
                key={provider.id}
                style={[
                  styles.providerCard,
                  { backgroundColor: provider.backgroundColor }
                ]}
                onPress={() => {
                  switch(provider.id) {
                    case '1': router.push('/airtel'); break;
                    case '2': router.push('/mtn'); break;
                    case '3': router.push('/glo'); break;
                    case '4': router.push('/9mobile'); break;
                    case '5': router.push('/betting'); break;
                    case '6': router.push('/electricity'); break;
                    case '7': router.push('/dstv'); break;
                    case '8': router.push('/gotv'); break;
                    case '9': router.push('/startimes'); break;
                    case '10': router.push('/waec'); break;
                  }
                }}
              >
                <Image 
                  source={provider.logo}
                  style={styles.providerLogo}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Image 
                  source={transaction.icon}
                  style={styles.transactionIcon}
                />
                <View>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  -{transaction.amount.toLocaleString()}
                </Text>
                <Text style={styles.transactionStatus}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}