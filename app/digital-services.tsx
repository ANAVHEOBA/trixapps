import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function DigitalServicesScreen() {
  const categories = ["All", "Subscriptions", "Gift Cards", "Recharge Cards"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const services = {
    subscriptions: Array(4).fill({
      name: "Twitch",
      rating: "4.5",
      image: require("../assets/twitch-logo.png"),
      route: "/twitch-detail",
      type: "subscription"
    }),
    rechargeCards: Array(4).fill({
      name: "Airtel",
      rating: "4.5",
      image: require("../assets/airtel-logo.png"),
      route: "/airtel-recharge",
      type: "recharge"
    })
  };

  const getFilteredServices = () => {
    switch(selectedCategory) {
      case "Recharge Cards":
        return services.rechargeCards;
      case "Subscriptions":
        return services.subscriptions;
      default:
        return [...services.subscriptions, ...services.rechargeCards];
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Digital Services</Text>
        <Pressable>
          <Ionicons name="search" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <Pressable style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#000" />
        </Pressable>
        {categories.map((category, index) => (
          <Pressable 
            key={index} 
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Services Grid */}
      <ScrollView style={styles.servicesContainer}>
        <View style={styles.servicesGrid}>
          {getFilteredServices().map((service, index) => (
            <Pressable 
              key={index} 
              style={styles.serviceCard}
              onPress={() => router.push(service.route)}
            >
              <Image 
                source={service.image}
                style={[
                  styles.serviceImage,
                  service.type === 'recharge' && styles.rechargeImage
                ]}
              />
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F0FF',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  servicesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#6441A5', // Twitch purple color
  },
  serviceInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '500',
  },

  selectedCategory: {
    backgroundColor: '#8A2BE2',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  rechargeImage: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
});