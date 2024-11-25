import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function BrandStoresScreen() {
  const categories = ["All", "Trending Now", "Best Deals", "Exclusive Drops"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const corsairCards = Array(8).fill({
    name: "Corsair",
    rating: "4.5",
    image: require("../assets/corsair-logo-brands.png")
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Brand Stores</Text>
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

           {/* Brands Grid */}
           <ScrollView style={styles.brandsContainer}>
        <View style={styles.brandsGrid}>
          {corsairCards.map((brand, index) => (
            <Pressable 
              key={index} 
              style={styles.brandCard}
              onPress={() => {
                router.push({
                  pathname: '/corsair-detail',
                  params: { activeTab: 'Reviews' }
                });
              }}
            >
              <Image 
                source={brand.image}
                style={styles.brandImage}
                resizeMode="contain"
              />
              <Pressable 
                style={styles.wishlistButton}
                onPress={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent Pressable
                  // Add wishlist functionality here
                }}
              >
                <Ionicons name="heart-outline" size={20} color="#8A2BE2" />
              </Pressable>
              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>{brand.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#8A2BE2" />
                  <Text style={styles.ratingText}>{brand.rating}</Text>
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
  selectedCategory: {
    backgroundColor: '#8A2BE2',
  },
  categoryText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  brandsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  brandCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  brandImage: {
    width: '100%',
    height: '70%',
  },
  wishlistButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  brandInfo: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
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
});