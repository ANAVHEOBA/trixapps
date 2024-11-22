import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen() {
  const categories = ["All", "Tech Merch", "Accessories", "Gaming Items"];
  const products = [
    {
      id: 1,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 2,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 3,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 4,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 5,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 6,
      name: "VIRTUOSO RGB WIRELESS High-Fidelity Headset",
      brand: "Corsair",
      progress: 8000,
      total: 10000,
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
        <Text style={styles.title}>Community</Text>
        <Pressable>
          <Ionicons name="search" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
      >
        <Pressable style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#000" />
        </Pressable>
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

      {/* Products Grid */}
<ScrollView showsVerticalScrollIndicator={false}>
  <View style={styles.productsGrid}>
    {products.map((product) => (
      <Pressable 
        key={product.id} 
        style={styles.productCard}
        onPress={() => router.push('/product-progress')}
      >
        <Image 
          source={product.image}
          style={styles.productImage}
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
        <View style={styles.cardContent}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <View style={styles.brandContainer}>
            <Ionicons name="person-circle-outline" size={16} color="#666" />
            <Text style={styles.brandText}>{product.brand}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#8A2BE2" />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Progress:</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(product.progress/product.total) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressValue}>
              {product.progress.toLocaleString()}/{product.total.toLocaleString()}
            </Text>
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
  productsGrid: {
    padding: 16,
    gap: 16,
  },
  productCard: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  verifiedBadge: {
    marginLeft: 4,
  },
  progressContainer: {
    gap: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8A2BE2',
  },
  progressValue: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});