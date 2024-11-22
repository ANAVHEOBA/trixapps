import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const menuItems = [
    { 
      icon: "chatbubble-outline", 
      title: "Chat With TRIX", 
      bg: "#000",
      route: "/chat"
    },
    { 
      icon: "heart-outline", 
      title: "Manage Your Wishlist", 
      bg: "#F8F0FF",
      route: "/wishlist"
    },
    { 
      icon: "people-outline", 
      title: "Explore Community", 
      bg: "#F8F0FF",
      route: "/community"
    },
    { 
      icon: "star-outline", 
      title: "Discover Exclusive Services", 
      bg: "#F8F0FF",
      route: "/discover-services"
    },
  ];

  const recentServices = Array(7).fill({
    title: "Service Place Holder",
    image: require("../assets/Ellipse100.png")
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Pressable 
            key={index}
            style={[styles.menuItem, { backgroundColor: item.bg }]}
            onPress={() => router.push(item.route)} 
          >
            <Ionicons 
              name={item.icon as any} 
              size={24} 
              color={item.bg === "#000" ? "#FFF" : "#000"}
            />
            <Text style={[
              styles.menuText,
              item.bg === "#000" && styles.menuTextLight
            ]}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Recent Services Section */}
      <Text style={styles.sectionTitle}>Recents Services Used</Text>
      <ScrollView style={styles.recentsList}>
        {recentServices.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <View style={styles.serviceInfo}>
              <Image 
                source={service.image}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
          </View>
        ))}
      </ScrollView>

      {/* User Profile */}
      <Pressable 
        style={styles.profileContainer}
        onPress={() => router.push("/profile")}
      >
        <View style={styles.profileInfo}>
          <Image 
            source={require("../assets/Ellipse100.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Ezzy Rider</Text>
            <View style={styles.pointsContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.pointsText}>12000</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  menuContainer: {
    gap: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuTextLight: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    color: '#666',
  },
  recentsList: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  serviceTitle: {
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
  },
});