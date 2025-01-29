import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

// Static data for services
const DIGITAL_SERVICES = [
  {
    id: '1',
    name: 'Airtel',
    icon: require('../assets/networks/airtel.png'),
    rating: 4.8,
    backgroundColor: '#FF0000',
    category: 'Subscriptions'
  },
  {
    id: '2',
    name: 'MTN',
    icon: require('../assets/networks/mtn.png'),
    rating: 4.9,
    backgroundColor: '#FFD700',
    category: 'Subscriptions'
  },
  {
    id: '3',
    name: 'Glo',
    icon: require('../assets/networks/glo.png'),
    rating: 4.7,
    backgroundColor: '#008000',
    category: 'Subscriptions'
  },
  {
    id: '4',
    name: '9mobile',
    icon: require('../assets/networks/9mobile.png'),
    rating: 4.6,
    backgroundColor: '#006400',
    category: 'Subscriptions'
  },
  {
    id: '5',
    name: 'DSTV',
    icon: require('../assets/services/dstv.png'),
    rating: 4.8,
    backgroundColor: '#2196F3',
    category: 'Cable TV'
  },
  {
    id: '6',
    name: 'GOtv',
    icon: require('../assets/services/gotv.png'),
    rating: 4.7,
    backgroundColor: '#3F51B5',
    category: 'Cable TV'
  },
  {
    id: '7',
    name: 'StarTimes',
    icon: require('../assets/services/startimes.png'),
    rating: 4.6,
    backgroundColor: '#E91E63',
    category: 'Cable TV'
  },
  {
    id: '8',
    name: 'Betting',
    icon: require('../assets/services/betting.png'),
    rating: 4.5,
    backgroundColor: '#4CAF50',
    category: 'Betting'
  }
];

const FILTERS = ['All', 'Subscriptions', 'Gift Cards', 'Recharge Card', 'Cable TV', 'Betting'];

export default function DigitalServicesScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filteredServices = DIGITAL_SERVICES.filter(service => 
    activeFilter === 'All' || service.category === activeFilter
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          style={styles.iconButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Digital Services</Text>
        <Pressable 
          onPress={() => router.push("/search")} 
          style={styles.iconButton}
        >
          <Ionicons name="search" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterTabs}
          contentContainerStyle={styles.filterTabsContent}
        >
          <Pressable style={styles.menuButton}>
            <Ionicons name="menu-outline" size={24} color="#000" />
          </Pressable>
          {FILTERS.map((filter) => (
            <Pressable 
              key={filter}
              style={[
                styles.filterTab, 
                activeFilter === filter && styles.activeTab
              ]}
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
      </View>

      {/* Services Grid */}
      <ScrollView 
        style={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <Pressable 
              key={service.id} 
              style={styles.serviceCardWrapper}
              onPress={() => router.push(`/${service.name.toLowerCase()}`)}
            >
              <View style={[styles.serviceCard, { backgroundColor: service.backgroundColor }]}>
                <Image 
                  source={service.icon}
                  style={styles.serviceImage}
                  resizeMode="contain"
                />
                <Pressable 
                  style={styles.favoriteButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(service.id);
                  }}
                >
                  <View style={styles.favoriteButtonInner}>
                    <Ionicons 
                      name={favorites.includes(service.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color="#8A2BE2" 
                    />
                  </View>
                </Pressable>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#8A2BE2" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    errorText: {
      color: '#666',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: '#8A2BE2',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
    },
    retryText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 48,
      paddingBottom: 16,
      backgroundColor: '#FFF',
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    filterContainer: {
      backgroundColor: '#FFF',
      paddingBottom: 16,
    },
    filterTabs: {
      paddingHorizontal: 16,
    },
    filterTabsContent: {
      alignItems: 'center',
      gap: 8,
    },
    menuButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    filterTab: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 24,
      backgroundColor: '#F5F5F5',
      marginRight: 8,
    },
    activeTab: {
      backgroundColor: '#8A2BE2',
    },
    filterText: {
      color: '#666',
      fontSize: 14,
      fontWeight: '500',
    },
    activeFilterText: {
      color: '#FFF',
    },
    servicesContainer: {
      flex: 1,
      padding: 16,
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    serviceCardWrapper: {
      width: '48%',
      marginBottom: 16,
      backgroundColor: '#FFF',
      borderRadius: 16,
      padding: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    serviceCard: {
      width: '100%',
      aspectRatio: 1.6,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    serviceImage: {
      width: '100%',
      height: '100%',
      padding: 16,
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
    },
    favoriteButtonInner: {
      backgroundColor: '#FFF',
      borderRadius: 15,
      padding: 6,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceInfo: {
      paddingTop: 12,
      paddingHorizontal: 4,
    },
    serviceName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    ratingText: {
      color: '#666',
      fontSize: 14,
    },
  });