import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function PaymentOptionsScreen() {
  const paymentOptions = [
    {
      id: 1,
      title: "Debit / Credit Card",
      icon: "card-outline",
      route: "/card-payment"
    },
    {
      id: 2,
      title: "Bank Transfer",
      icon: "business-outline",
      route: "/bank-transfer"
    },
    {
      id: 3,
      title: "PayPal",
      icon: "logo-paypal",
      route: "/paypal"
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Payment</Text>
        <Text style={styles.subtitle}>Options</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.optionsContainer}>
        {paymentOptions.map((option) => (
          <Pressable 
            key={option.id}
            style={styles.optionButton}
            onPress={() => router.push(option.route)}
          >
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name={option.icon} size={24} color="#000" />
          </Pressable>
        ))}

        {/* Add Another Option Button */}
        <Pressable style={styles.addOptionButton}>
          <Ionicons name="add" size={20} color="#8A2BE2" />
          <Text style={styles.addOptionText}>Add another option</Text>
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
    padding: 24,
    paddingTop: 48,
  },
  titleContainer: {
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  optionsContainer: {
    padding: 24,
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8F0FF',
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  addOptionText: {
    fontSize: 16,
    color: '#8A2BE2',
    fontWeight: '500',
  },
});