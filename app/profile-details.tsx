import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function ProfileDetailsScreen() {
  const menuItems = [
    {
      icon: "person-outline",
      title: "Update Profile",
      route: "/update-profile"
    },
    {
      icon: "settings-outline",
      title: "Account Settings",
      route: "/account-settings"
    },
    {
      icon: "people-outline",
      title: "My Referrals",
      route: "/referrals"
    },
    {
      icon: "shield-outline",
      title: "Privacy Policy",
      route: "/privacy-policy"
    },
    {
      icon: "help-circle-outline",
      title: "Help Center",
      route: "/help-center"
    }
  ];

  return (
    <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </Pressable>
        <Pressable 
          style={styles.walletButton}
          onPress={() => router.push('/wallet')}
        >
          <Ionicons name="wallet-outline" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Pressable style={styles.profileDropdown}>
          <Text style={styles.profileName}>Rider Ezzy</Text>
          <Ionicons name="chevron-down" size={20} color="#8A2BE2" />
        </Pressable>

        {/* Points Progress */}
        <View style={styles.pointsSection}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Current Point:</Text>
            <View style={styles.pointsBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.pointsValue}>120,000</Text>
            </View>
          </View>
          <View style={styles.levelProgress}>
            <Text style={styles.levelText}>Level 12</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.levelText}>Level 13</Text>
          </View>
        </View>

        {/* Activity Milestones */}
        <View style={styles.milestonesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity Milestones</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.milestonesScroll}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.milestoneCard}>
                {/* Placeholder for milestone content */}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <Pressable 
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={24} color="#8A2BE2" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </Pressable>
        ))}
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
  walletButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    padding: 24,
  },
  profileDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
  },
  pointsSection: {
    backgroundColor: '#F8F0FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  levelProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelText: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
  },
  milestonesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  milestonesScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  milestoneCard: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    marginRight: 12,
  },
  menuSection: {
    padding: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});