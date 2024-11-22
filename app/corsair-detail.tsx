import { View, Text, Pressable, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CorsairDetailScreen() {
    const [activeTab, setActiveTab] = useState('Description');
    const categories = ["All", "Trending Now", "Best Deals", "Exclusive Drops"];
    
    const products = [
      {
        id: 1,
        name: "VIRTUOSO RGB WIRELESS",
        subtitle: "High-Fidelity Headset",
        brand: "Corsair",
        points: "150,000",
        image: require("../assets/corsair-headset.png")
      },
      // Add more products as needed
    ];

  const reviews = [
    {
      id: 1,
      name: "Rider Ezzy",
      time: "2 Days ago",
      comment: "Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featurin...",
      avatar: require("../assets/avatar.png")
    },
    {
      id: 2,
      name: "Rider Ezzy",
      time: "2 Days ago",
      comment: "Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featurin...",
      avatar: require("../assets/avatar.png")
    },
    {
      id: 3,
      name: "Rider Ezzy",
      time: "2 Days ago",
      comment: "Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featurin...",
      avatar: require("../assets/avatar.png")
    },

    {
        id: 4,
        name: "Rider Ezzy",
        time: "2 Days ago",
        comment: "Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featurin...",
        avatar: require("../assets/avatar.png")
      },
    ];


return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.pointsText}>12000</Text>
          <Ionicons name="add" size={20} color="#FFF" />
        </View>
  
        <Pressable>
          <Ionicons name="search" size={24} color="#000" />
        </Pressable>
      </View>
  
      <ScrollView>
        {/* Brand Logo */}
        <View style={styles.brandLogoContainer}>
          <Image 
            source={require("../assets/corsair-logo-large.png")}
            style={styles.brandLogo}
            resizeMode="contain"
          />
        </View>
  
        {/* Brand Info */}
        <View style={styles.brandInfo}>
          <View style={styles.brandHeader}>
            <Image 
              source={require("../assets/corsair-icon.png")}
              style={styles.brandIcon}
            />
            <Text style={styles.brandName}>Corsair</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#8A2BE2" />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>
  
          {/* Tabs */}
          <View style={styles.tabs}>
            <Pressable 
              style={[styles.tab, activeTab === 'Description' && styles.activeTab]}
              onPress={() => setActiveTab('Description')}
            >
              <Text style={[styles.tabText, activeTab === 'Description' && styles.activeTabText]}>
                Description
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
              onPress={() => setActiveTab('Reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>
                Reviews
              </Text>
            </Pressable>
          </View>
  
          {/* Content based on active tab */}
          {activeTab === 'Description' ? (
            <View style={styles.content}>
              <Text style={styles.aboutTitle}>About Corsair</Text>
              <Text style={styles.description}>
                Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featuring customizable RGB lighting, precision-tuned 50mm neodymiu...
              </Text>
  
              {/* Categories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                <Pressable style={styles.filterButton}>
                  <Ionicons name="filter" size={20} color="#000" />
                </Pressable>
                {categories.map((category, index) => (
             <Pressable 
                key={index} 
                style={styles.categoryButton}
                onPress={() => router.push('/featured')}
                >
              <Text style={styles.categoryText}>{category}</Text>
               </Pressable>
                    ))}
              </ScrollView>
  
              {/* Products Grid */}
              <View style={styles.productsGrid}>
                {products.map((product) => (
                  <View key={product.id} style={styles.productCard}>
                    <Image 
                      source={product.image}
                      style={styles.productImage}
                    />
                    <Pressable style={styles.wishlistButton}>
                      <Ionicons name="heart-outline" size={20} color="#8A2BE2" />
                    </Pressable>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                    <Text style={styles.brandText}>{product.brand}</Text>
                    <View style={styles.priceContainer}>
                      <View style={styles.pointsBadge}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.pointsValue}>{product.points}</Text>
                      </View>
                      <Pressable style={styles.addButton}>
                        <Ionicons name="add" size={20} color="#8A2BE2" />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.reviewsContainer}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image source={review.avatar} style={styles.avatar} />
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      <Text style={styles.reviewTime}>{review.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))}
              
              <View style={styles.addReviewContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter Review"
                    style={styles.reviewInput}
                  />
                  <Pressable style={styles.micButton}>
                    <Ionicons name="mic-outline" size={24} color="#000" />
                  </Pressable>
                </View>
                <Pressable style={styles.headphoneButton}>
                  <Ionicons name="headset-outline" size={24} color="#000" />
                </Pressable>
              </View>
            </View>
          )}
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
    brandLogoContainer: {
      width: '100%',
      height: 200,
      backgroundColor: '#F8F8F8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandLogo: {
      width: '60%',
      height: '60%',
    },
    brandInfo: {
      flex: 1,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
      padding: 24,
    },
    brandHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    brandIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    brandName: {
      fontSize: 24,
      fontWeight: '600',
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
    tabs: {
      flexDirection: 'row',
      marginTop: 24,
      gap: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: '#F8F0FF',
    },
    tabText: {
      fontSize: 16,
      color: '#666',
    },
    activeTabText: {
      color: '#8A2BE2',
      fontWeight: '500',
    },
    content: {
      marginTop: 24,
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
    categoriesContainer: {
      marginTop: 24,
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
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    productCard: {
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
    productImage: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
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
      marginTop: 12,
      paddingHorizontal: 12,
    },
    productSubtitle: {
      fontSize: 14,
      color: '#666',
      paddingHorizontal: 12,
    },
    brandText: {
      fontSize: 14,
      color: '#8A2BE2',
      paddingHorizontal: 12,
      marginTop: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
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

    reviewsContainer: {
        flex: 1,
        padding: 16,
      },
      reviewCard: {
        marginBottom: 24,
      },
      reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
      },
      reviewInfo: {
        flex: 1,
      },

      reviewerName: {
        fontSize: 16,
        fontWeight: '500',
      },
      reviewTime: {
        fontSize: 14,
        color: '#666',
      },
      reviewText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
      },
      addReviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
      },

      inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 24,
        paddingHorizontal: 16,
      },
      reviewInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
      },
      micButton: {
        padding: 8
      },
      headphoneButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }); 