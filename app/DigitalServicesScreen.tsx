import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView, 
  Image, 
  ActivityIndicator 
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { TokenManager } from './utilities/tokenManager';
import { ApiClient } from './utilities/apiClient';

// Types
interface Service {
  id: string;
  name: string;
  icon: string;
  rating: number;
  backgroundColor: string;
  category: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
}

interface Category {
  id: string;
  name: string;
}

export default function DigitalServicesScreen() {
  // State
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadServices(),
        loadUserFavorites(),
        loadCategories()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadServices = async () => {
    try {
        const response = await ApiClient.get('/services/digital');
        console.log('API Response:', response); // Debug log

        if (response.success && response.data && response.data.services) {
            // If the services are nested in a 'services' property
            setServices(response.data.services);
        } else if (response.success && Array.isArray(response.data)) {
            // If services are directly in the data array
            setServices(response.data);
        } else {
            setServices([]); // Set empty array as fallback
            setError(response.message || 'Failed to load services');
        }
    } catch (error) {
        setServices([]); // Set empty array on error
        setError('Network error occurred');
        console.error('Error loading services:', error);
    }
};


const loadUserFavorites = async () => {
  try {
      const response = await ApiClient.get('/user/favorites');
      console.log('Favorites Response:', response); // Debug log
      
      if (response.success && response.data && response.data.favorites) {
          // Extract just the IDs from the favorites array
          setFavorites(response.data.favorites.map((fav: Service) => fav.id));
      } else {
          setFavorites([]);
      }
  } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
  }
};

  const loadCategories = async () => {
    try {
      const response = await ApiClient.get('/services/categories');
      if (response.success) {
        setCategories([{ id: 'all', name: 'All' }, ...response.data]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const toggleFavorite = async (serviceId: string) => {
    try {
      const endpoint = favorites.includes(serviceId) 
        ? `/user/favorites/${serviceId}/remove`
        : `/user/favorites/${serviceId}/add`;
      
      const response = await ApiClient.post(endpoint, {});
      
      if (response.success) {
        setFavorites(prev => 
          prev.includes(serviceId)
            ? prev.filter(id => id !== serviceId)
            : [...prev, serviceId]
        );
      } else {
        console.error('Failed to update favorite:', response.message);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const filteredServices = services?.filter(service => 
    activeFilter === 'All' || service.category === activeFilter
) || [];

  // Loading State
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadInitialData}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }


    // Main Render
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
            {['All', 'Subscriptions', 'Gift Cards', 'Recharge Card'].map((filter) => (
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
                onPress={() => router.push(`/services/${service.name.toLowerCase()}`)}
              >
                <View style={[styles.serviceCard, { backgroundColor: service.backgroundColor }]}>
                  <Image 
                    source={
                      typeof service.icon === 'string' 
                        ? { uri: service.icon }
                        : require('../assets/default-service-icon.png')
                    }
                    style={styles.serviceImage}
                    resizeMode="contain"
                    defaultSource={require('../assets/default-service-icon.png')}
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