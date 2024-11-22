import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function WalletScreen() {
  const actions = [
    { icon: "time-outline", label: "Details", route: "/wallet-details" },
    { icon: "add", label: "Add Funds", route: "/add-funds" },
    { icon: "ticket-outline", label: "Add Voucher", route: "/add-voucher" },
    { icon: "grid-outline", label: "More", route: "/more-options" },
  ];

  const transactions = [
    { id: 1, title: "Product Payment", date: "Payment Date", amount: "120,000" },
    { id: 2, title: "Product Payment", date: "Payment Date", amount: "120,000" },
    { id: 3, title: "Product Payment", date: "Payment Date", amount: "120,000" },
    { id: 4, title: "Product Payment", date: "Payment Date", amount: "120,000" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Card Section */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          {/* Card content goes here */}
        </View>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </Pressable>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <Pressable 
            key={index} 
            style={styles.actionButton}
            onPress={() => router.push(action.route)}
          >
            <View style={styles.actionIcon}>
              <Ionicons name={action.icon} size={24} color="#8A2BE2" />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Image 
                  source={require("../assets/corsair-logo.png")}
                  style={styles.transactionIcon}
                />
                <View>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.amount}>{transaction.amount}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
    padding: 24,
    paddingTop: 48,
  },
  cardSection: {
    padding: 24,
    position: 'relative',
  },
  card: {
    height: 200,
    backgroundColor: '#000',
    borderRadius: 16,
    marginBottom: 24,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 40,
    height: 200,
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#666',
  },
  transactionsSection: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
});