import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverServicesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="menu" size={24} color="#000" />
        </Pressable>
        
        <Pressable style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Upgrade Plan</Text>
          <Ionicons name="add" size={20} color="#8A2BE2" />
        </Pressable>

        <Pressable>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Where Would You Like</Text>
        <Text style={styles.title}>To shop Today?</Text>
        <Text style={styles.subtitle}>Shop, Earn, Repeat.</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Store Options */}
      <View style={styles.storeOptions}>
        <Pressable 
          style={styles.storeButton}
          onPress={() => router.push("/reward-store")}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="gift-outline" size={24} color="#FFF" />
          </View>
          <Text style={styles.storeText}>Reward Store</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </Pressable>

        <Pressable 
          style={styles.storeButton}
          onPress={() => router.push("/featured-store")}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="star-outline" size={24} color="#FFF" />
          </View>
          <Text style={styles.storeText}>Featured Store</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </Pressable>
      </View>
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
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  upgradeText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
  titleSection: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    opacity: 0.2,
  },
  storeOptions: {
    padding: 24,
    gap: 16,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  storeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});