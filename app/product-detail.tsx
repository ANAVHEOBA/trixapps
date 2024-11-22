import { View, Text, Pressable, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProductDetailScreen() {
  const [activeTab, setActiveTab] = useState('Description');
  const colors = ["Carbon", "White", "Red", "Black", "Black"];
  
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
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Pressable style={styles.wishlistButton}>
          <Ionicons name="heart-outline" size={24} color="#8A2BE2" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image 
          source={require("../assets/corsair-headset.png")}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>VIRTUOSO RGB WIRELESS High-Fidelity Headset</Text>
            <Pressable style={styles.addButton}>
              <Ionicons name="add" size={24} color="#8A2BE2" />
            </Pressable>
          </View>

          <View style={styles.brandContainer}>
            <Ionicons name="person-circle-outline" size={20} color="#666" />
            <Text style={styles.brandText}>Corsair</Text>
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

          {/* Description Content */}
          {activeTab === 'Description' && (
            <View>
              <Text style={styles.sectionTitle}>Product Description:</Text>
              <Text style={styles.description}>
                Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, 
                designed for the discerning gamer. Featuring customizable RGB lighting, 
                precision-tuned 50mm neodymiu...
              </Text>

              <Text style={styles.sectionTitle}>Available Colors:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorsContainer}>
                {colors.map((color, index) => (
                  <Pressable 
                    key={index}
                    style={styles.colorButton}
                  >
                    <Text style={styles.colorText}>{color}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Reviews Content */}
          {activeTab === 'Reviews' && (
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

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.priceLabel}>Total Price:</Text>
              <View style={styles.pointsBadge}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.pointsValue}>150,000</Text>
              </View>
            </View>
            
            <Pressable style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Item</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </Pressable>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F8F8F8',
  },
  productInfo: {
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  colorsContainer: {
    marginBottom: 24,
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F0FF',
    borderRadius: 20,
    marginRight: 8,
  },
  colorText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  reviewsContainer: {
    marginTop: 16,
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
    padding: 8,
  },
  headphoneButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});