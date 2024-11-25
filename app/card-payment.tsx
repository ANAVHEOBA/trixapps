import { View, Text, Pressable, StyleSheet, TextInput, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CardPaymentScreen() {
  const [selectedType, setSelectedType] = useState('debit');
  const [saveCard, setSaveCard] = useState(false);

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
        <Text style={styles.title}>Debit / Credit Card</Text>
        <Text style={styles.subtitle}>Details</Text>
      </View>

      {/* Card Type Selector */}
      <View style={styles.cardTypeContainer}>
        <Pressable 
          style={[styles.typeButton, selectedType === 'debit' && styles.selectedType]}
          onPress={() => setSelectedType('debit')}
        >
          <Text style={[styles.typeText, selectedType === 'debit' && styles.selectedTypeText]}>
            Debit Card
          </Text>
        </Pressable>
        <Pressable 
          style={[styles.typeButton, selectedType === 'credit' && styles.selectedType]}
          onPress={() => setSelectedType('credit')}
        >
          <Text style={[styles.typeText, selectedType === 'credit' && styles.selectedTypeText]}>
            Credit Card
          </Text>
        </Pressable>
      </View>

      {/* Card Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Ezzy Rider"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Card Number</Text>
          <View style={styles.cardNumberContainer}>
            <TextInput
              style={styles.cardNumberInput}
              placeholder="5534 42348 5788 5730"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <Image 
              source={require("../assets/logos_mastercard.png")}
              style={styles.cardTypeIcon}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Card Expiry Date</Text>
            <View style={styles.expiryContainer}>
              <TextInput
                style={styles.expiryInput}
                placeholder="03/25"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
              <Ionicons name="calendar-outline" size={24} color="#8A2BE2" />
            </View>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 16 }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="•••"
              placeholderTextColor="#666"
              keyboardType="numeric"
              secureTextEntry
              maxLength={3}
            />
          </View>
        </View>

        {/* Save Card Option */}
        <Pressable 
          style={styles.saveCardContainer}
          onPress={() => setSaveCard(!saveCard)}
        >
          <View style={[styles.checkbox, saveCard && styles.checkedBox]}>
            {saveCard && <Ionicons name="checkmark" size={16} color="#FFF" />}
          </View>
          <Text style={styles.saveCardText}>Save Card for Future Checkouts</Text>
        </Pressable>
      </View>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
      <Pressable 
  style={styles.payButton}
  onPress={() => router.push('/verify-card')}
>
  <Text style={styles.payButtonText}>Pay Now</Text>
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
  cardTypeContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedType: {
    borderBottomWidth: 2,
    borderBottomColor: '#8A2BE2',
  },
  typeText: {
    fontSize: 16,
    color: '#666',
  },
  selectedTypeText: {
    color: '#8A2BE2',
    fontWeight: '500',
  },
  formContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingRight: 16,
  },
  cardNumberInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  cardTypeIcon: {
    width: 32,
    height: 20,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingRight: 16,
  },
  expiryInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#8A2BE2',
  },
  saveCardText: {
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  payButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});