import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

interface Service {
  id: string;
  name: string;
  icon: any;
  rating: number;
  backgroundColor: string;
}

const services: Service[] = [
  { 
    id: '1', 
    name: 'Airtel', 
    icon: require('../assets/airtel.png'), 
    rating: 4.5,
    backgroundColor: '#E60012'
  },
  { 
    id: '2', 
    name: 'Spotify', 
    icon: require('../assets/spotify.png'), 
    rating: 4.5,
    backgroundColor: '#000000'
  },
  { 
    id: '3', 
    name: 'MTN', 
    icon: require('../assets/mtn.png'), 
    rating: 4.5,
    backgroundColor: '#FDB913'
  },
  { 
    id: '4', 
    name: 'Twitch', 
    icon: require('../assets/twitch.png'), 
    rating: 4.5,
    backgroundColor: '#6441A5'
  },
  { 
    id: '5', 
    name: 'iTunes', 
    icon: require('../assets/itunes.png'), 
    rating: 4.5,
    backgroundColor: '#F5F5F7'
  },
  { 
    id: '6', 
    name: '9mobile', 
    icon: require('../assets/9mobile.png'), 
    rating: 4.5,
    backgroundColor: '#F5F5F7'
  },
  { 
    id: '7', 
    name: 'DSTV', 
    icon: require('../assets/dstv.png'), 
    rating: 4.5,
    backgroundColor: '#001B42'
  },
  { 
    id: '8', 
    name: 'Netflix', 
    icon: require('../assets/netflix.png'), 
    rating: 4.5,
    backgroundColor: '#000000'
  }
];

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
          {services.map((service) => (
            <Pressable 
              key={service.id} 
              style={styles.serviceCardWrapper}
              onPress={() => router.push(`/services/${service.name.toLowerCase()}`)}
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