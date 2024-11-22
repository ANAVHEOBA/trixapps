import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    code: '+1',
    flag: '🇺🇸'
  });

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </Pressable>

      {/* Title and Description */}
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.description}>
        To begin the password recovery process, please enter{'\n'}
        the phone number associated with your account.
      </Text>

      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Pressable 
          style={styles.countrySelector}
          onPress={() => {/* Handle country selection */}}
        >
          <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
          <Text style={styles.countryCode}>{selectedCountry.code}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Pressable>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone No."
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Alternative Method Link */}
      <Pressable onPress={() => router.push("/forgot-password-email")}>
  <Text style={styles.alternativeText}>Use a different Method?</Text>
       </Pressable>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={[
            styles.confirmButton,
            !phoneNumber && styles.confirmButtonDisabled
          ]}
          onPress={() => router.push("/verification")}
          disabled={!phoneNumber}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </Pressable>

        {/* Sign In Link */}
        <Text style={styles.signInText}>
          Already Have an Account? <Text style={styles.signInLink} onPress={() => router.push("/signin")}>Sign in</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  countryFlag: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  alternativeText: {
    color: '#8A2BE2',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    textAlign: 'center',
    color: '#666',
  },
  signInLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
});