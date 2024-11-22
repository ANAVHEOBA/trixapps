import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function VerifyCardScreen() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);

  const handlePinChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Move to next input if value is entered
      if (value && index < 3) {
        setActiveInput(index + 1);
      }
    }
  };

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
        <Text style={styles.title}>Verify Your Card</Text>
        <Text style={styles.subtitle}>Ownership</Text>
      </View>

      {/* PIN Input Section */}
      <View style={styles.pinSection}>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.pinInput,
                activeInput === index && styles.activeInput
              ]}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry
              onFocus={() => setActiveInput(index)}
            />
          ))}
        </View>

        {/* Info Message */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={24} color="#8A2BE2" />
          <Text style={styles.infoText}>
            To verify you're the owner of this card, please enter your card pin.
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
      // Update the Confirm Button section
<Pressable 
  style={styles.confirmButton}
  onPress={() => {
    // You might want to add verification logic here before navigation
    router.push('/wallet'); // Navigate to wallet screen
    // Or if you want to clear the navigation stack and make wallet the root screen:
    // router.replace('/wallet');
  }}
>
  <Text style={styles.confirmButtonText}>Confirm</Text>
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
  pinSection: {
    padding: 24,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  pinInput: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeInput: {
    borderColor: '#8A2BE2',
    borderWidth: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F0FF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});