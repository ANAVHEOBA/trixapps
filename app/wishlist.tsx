import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  const categories = ["All", "Tech Merch", "Accessories", "Gaming Items"];
  const wishlistItems = [
    {
      id: 1,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      points: "30,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 2,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      points: "30,000",
      image: require("../assets/corsair-headset.png")
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>My Wishlist</Text>
        <Pressable>
          <Ionicons name="help-circle-outline" size={24} color="#000" />
        </Pressable>
      </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Pressable onPress={() => router.push('/profile-details')}>
            <Image 
              source={require("../assets/profile-pic.png")}
              style={styles.profileImage}
            />
          </Pressable>
          <Pressable 
            style={styles.communityButton}
            onPress={() => router.push('/community')}
          >
            <Image 
              source={require("../assets/discord-icon.png")}
              style={styles.communityIcon}
            />
          </Pressable>
        </View>
        <Text style={styles.profileName}>RiderEzzy <Ionicons name="checkmark-circle" size={16} color="#8A2BE2" /></Text>
        <Text style={styles.profileHandle}>TrixRewrd/RiderEzzy <Ionicons name="copy-outline" size={16} color="#666" /></Text>
        <Text style={styles.profileBio}>Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset</Text>
        
        <View style={styles.socialLinks}>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={24} color="#8A2BE2" />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={24} color="#8A2BE2" />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-youtube" size={24} color="#8A2BE2" />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-twitch" size={24} color="#8A2BE2" />
          </Pressable>
        </View>
      </View>

      {/* Wishlist Count */}
      <View style={styles.wishlistCount}>
        <View style={styles.countBadge}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.countText}>Current Wishes: 4</Text>
        </View>
        <Pressable style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#8A2BE2" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <Pressable 
            key={index} 
            style={[styles.categoryButton, index === 0 && styles.activeCategoryButton]}
          >
            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Wishlist Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wishlistGrid}>
          {wishlistItems.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.wishlistCard}
              onPress={() => router.push('/product-detail')}
            >
              <Image 
                source={item.image}
                style={styles.productImage}
              />
              <Pressable style={styles.wishlistButton}>
                <Ionicons name="heart" size={20} color="#8A2BE2" />
              </Pressable>
              <View style={styles.cardContent}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <View style={styles.brandContainer}>
                  <Ionicons name="person-circle-outline" size={16} color="#666" />
                  <Text style={styles.brandText}>{item.brand}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <View style={styles.pointsBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.pointsValue}>{item.points}</Text>
                  </View>
                  <Pressable style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#8A2BE2" />
                  </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  communityButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  communityIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF', 
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countText: {
    fontSize: 16,
    fontWeight: '500',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F0FF',
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#8A2BE2',
  },
  categoryText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  wishlistGrid: {
    padding: 16,
    gap: 16,
  },
  wishlistCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
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
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  },
  cardContent: {
    padding: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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