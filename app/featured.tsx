import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


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
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 16,
      gap: 16,
    },
    productCard: {
      width: '47%',
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
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 4,
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
  });

export default function FeaturedScreen() {
  const categories = ["All", "Tech Merch", "Accessories", "Gaming Items"];
  const products = [
    {
      id: 1,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 2,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 3,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 4,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 5,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
    {
      id: 6,
      name: "VIRTUOSO RGB WIRELESS",
      subtitle: "High-Fidelity Headset",
      brand: "Corsair",
      points: "150,000",
      image: require("../assets/corsair-headset.png")
    },
  ];

  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.title}>Featured</Text>
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
                onPress={() => router.push('/product-detail')}
              >
                <Image 
                  source={product.image}
                  style={styles.productImage}
                />
                <Pressable 
                  style={styles.wishlistButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    // Add wishlist functionality here
                  }}
                >
                  <Ionicons name="heart-outline" size={20} color="#8A2BE2" />
                </Pressable>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                <View style={styles.brandContainer}>
                  <Ionicons name="person-circle-outline" size={16} color="#666" />
                  <Text style={styles.brandText}>{product.brand}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <View style={styles.pointsBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.pointsValue}>{product.points}</Text>
                  </View>
                  <Pressable 
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      // Add to cart functionality here
                    }}
                  >
                    <Ionicons name="add" size={20} color="#8A2BE2" />
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }