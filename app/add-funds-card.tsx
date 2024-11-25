import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function AddFundsCardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Add Funds</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card Display */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          {/* Card content */}
        </View>
        <View style={styles.cardIndicator} />
      </View>

      {/* Fund Options */}
      <View style={styles.optionsContainer}>
        {/* Fund From Wallet */}
        <View>
          <Text style={styles.sectionTitle}>Fund From Wallet</Text>
          <Pressable 
       style={styles.optionButton}
       onPress={() => router.push('/add-from-wallet')}
       >
      <Text style={styles.optionText}>Rider Ezzy</Text>
     <View style={styles.walletIcon}>
     <Text style={styles.walletIconText}>₳</Text>
     </View>
     </Pressable>
        </View>

        {/* Other Methods */}
        <View style={styles.otherMethods}>
          <Text style={styles.sectionTitle}>Other Methods</Text>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionText}>Bank Transfer</Text>
            <Ionicons name="business-outline" size={24} color="#000" />
          </Pressable>

          <Pressable 
          style={styles.optionButton}
          onPress={() => router.push('/add-from-card')}
          >
          <Text style={styles.optionText}>•••• •••• •••• 5730</Text>
         <Image 
        source={require("../assets/logos_mastercard.png")}
         style={styles.cardIcon}
        />
      </Pressable>

          {/* Add Card Link */}
          <Pressable 
            style={styles.addCardLink}
            onPress={() => router.push('/add-card')}
          >
            <Ionicons name="add-circle" size={20} color="#8A2BE2" />
            <Text style={styles.addCardText}>Add Card</Text>
          </Pressable>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  cardSection: {
    padding: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#8A2BE2',
    borderRadius: 16,
    marginBottom: 16,
  },
  cardIndicator: {
    width: 32,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  optionsContainer: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  walletIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIconText: {
    fontSize: 14,
    fontWeight: '600',
  },
  otherMethods: {
    marginTop: 32,
  },
  cardIcon: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
  },
  addCardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  addCardText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
});