import { View, Text, TextInput, Image, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function SignUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image 
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>🇺🇸 +1</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone No."
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Referral Code Input */}
        <TextInput
          style={styles.referralInput}
          placeholder="Referral Code (Optional)"
          value={referralCode}
          onChangeText={setReferralCode}
        />

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Pressable 
            style={styles.checkbox}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms && <View style={styles.checked} />}
          </Pressable>
          <Text style={styles.termsText}>
            Agree with {' '}
            <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <Pressable 
          style={[styles.signUpButton, !agreedToTerms && styles.signUpButtonDisabled]}
          disabled={!agreedToTerms}
          onPress={() => router.push("/verification")}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>

        {/* Social Sign Up */}
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>or Sign Up With</Text>
          <View style={styles.socialButtons}>
            <Pressable style={styles.socialButton}>
              <Image source={require("../assets/google.png")} style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Image source={require("../assets/apple.png")} style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
            </Pressable>
          </View>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an Account? {' '}
            <Text 
              style={styles.signInLink}
              onPress={() => router.push("/signin")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: '#FFFFFF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
  },
  countryCode: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
  },
  referralInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#8A2BE2',
    borderRadius: 2,
  },
  termsText: {
    color: '#666',
  },
  termsLink: {
    color: '#8A2BE2',
  },
  signUpButton: {
    backgroundColor: '#8A2BE2',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
  },
  orText: {
    color: '#666',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    color: '#666',
  },
  signInLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
});