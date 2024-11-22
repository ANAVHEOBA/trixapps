import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function AddFundsScreen() {
  const features = [
    {
      icon: "globe-outline",
      title: "Recieve International Payments",
      description: "Get paid by foreign clients. Ideal for freelancers, creators and remote workers."
    },
    {
      icon: "flash-outline",
      title: "Convenient and quick",
      description: "Experience the ease of instantly receiving funds and making International payments from your USD account."
    },
    {
      icon: "wallet-outline",
      title: "Affordable Fees",
      description: "ACH & Wire transfers supported\n~ 0.25% for deposits\n~ $1.00 monthly meaintainace fees\n~ #3,000 Account request fee"
    },
    {
      icon: "card-outline",
      title: "Payments we support",
      description: "~ First party: Sending funds to yourself\n~ Business: Paying business contractors or vendors\n~ International ACH transactions (IATs): Subscriptions for platforms like Apple, amazon, and so on."
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Request USD</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Features List */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.iconContainer}>
              <Ionicons name={feature.icon} size={24} color="#8A2BE2" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}

        {/* Terms Agreement */}
        <Text style={styles.termsText}>
          By Continuing you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>.
        </Text>
      </ScrollView>

      {/* Request Button */}
      <View style={styles.bottomContainer}>
      // In the Request Button
<Pressable 
  style={styles.requestButton}
  onPress={() => router.push('/payment-options')}
>
  <Text style={styles.requestButtonText}>Request USD Account</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 24,
  },
  termsLink: {
    color: '#8A2BE2',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  requestButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});