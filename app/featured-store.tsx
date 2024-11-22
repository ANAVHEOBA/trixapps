import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function FeaturedStoreScreen() {
  const categories = ["All", "Subscriptions", "Gift Cards", "Recharge Cards"];
  const brandCategories = ["All", "Trending Now", "Best Deals", "Exclusive Drops"];
  const productCategories = ["All", "Tech Merch", "Accessories", "Gaming Items"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="menu" size={24} color="#000" />
        </Pressable>
        
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.pointsText}>12000</Text>
          <Ionicons name="add" size={20} color="#000" />
        </View>

        <Pressable>
          <Ionicons name="search" size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView>
        {/* Digital Services Section */}
        <View style={styles.section}>
        <Pressable 
            style={styles.sectionHeader}
            onPress={() => router.push('/digital-services')} 
          >
            <Text style={styles.sectionTitle}>Digital Services</Text>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </Pressable>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Digital Services</Text>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#000" />
            </Pressable>
            {categories.map((category, index) => (
              <Pressable key={index} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{category}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesContainer}>
            {[1, 2, 3, 4].map((item) => (
              <Image 
                key={item}
                source={require('../assets/twitch-card.png')}
                style={styles.serviceCard}
              />
            ))}
          </ScrollView>
        </View>

                {/* Brand Stores Section */}
                <View style={styles.section}>
          <Pressable 
            style={styles.sectionHeader}
            onPress={() => router.push('/brand-stores')}  // Added navigation
          >
            <Text style={styles.sectionTitle}>Brand Stores</Text>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </Pressable>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#000" />
            </Pressable>
            {brandCategories.map((category, index) => (
              <Pressable 
                key={index} 
                style={styles.categoryButton}
                onPress={() => router.push('/brand-stores')}  // Added navigation
              >
                <Text style={styles.categoryText}>{category}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandsContainer}>
            {[1, 2, 3].map((item) => (
              <Pressable 
                key={item}
                onPress={() => router.push('/brand-stores')}  // Added navigation
              >
                <Image 
                  source={require('../assets/corsair-logo.png')}
                  style={styles.brandCard}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="#000" />
            </Pressable>
            {productCategories.map((category, index) => (
              <Pressable key={index} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{category}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.productsGrid}>
            {[1, 2].map((item) => (
              <View key={item} style={styles.productCard}>
                <Image 
                  source={require('../assets/headset.png')}
                  style={styles.productImage}
                />
                <Pressable style={styles.wishlistButton}>
                  <Ionicons name="heart-outline" size={20} color="#8A2BE2" />
                </Pressable>
                <Text style={styles.productTitle}>VIRTUOSO RGB WIRELESS</Text>
                <Text style={styles.productSubtitle}>High-Fidelity Headset</Text>
                <Text style={styles.brandName}>Corsair</Text>
                <View style={styles.priceContainer}>
                  <View style={styles.pointsBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.pointsValue}>150,000</Text>
                  </View>
                  <Pressable style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#8A2BE2" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
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
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#000',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 4,
    },
    pointsText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '500',
    },
    section: {
      padding: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
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
      marginTop: 16,
    },
    serviceCard: {
      width: 150,
      height: 100,
      borderRadius: 12,
      marginRight: 16,
    },
    brandsContainer: {
      marginTop: 16,
    },
    brandCard: {
      width: 150,
      height: 80,
      borderRadius: 12,
      marginRight: 16,
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      marginTop: 16,
    },
    productCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
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
    productTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 8,
    },
    productSubtitle: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    brandName: {
      fontSize: 14,
      color: '#8A2BE2',
      marginTop: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    pointsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    pointsValue: {
      fontSize: 16,
      fontWeight: '500',
    },
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#F8F0FF',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });