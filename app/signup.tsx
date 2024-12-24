import { View, Text, TextInput, Image, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { useState } from "react";
import CountryPicker from './components/CountryPicker';
import { countries, Country } from './utils/countries';
import storage from './utils/storage';
import api from './utils/api';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default function SignUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [referralCode, setReferralCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = async () => {
    try {
      const response = await api.auth.validatePhone(
        phoneNumber,
        selectedCountry.code
      );
      return response.success;
    } catch (error) {
      console.error('Phone validation error:', error);
      Alert.alert('Validation Error', error.message);
      return false;
    }
  };

  const sendOtp = async () => {
    try {
      const response = await api.auth.sendOtp(
        phoneNumber,
        selectedCountry.code
      );
      return response.success;
    } catch (error) {
      console.error('OTP sending error:', error);
      Alert.alert('Error', 'Failed to send verification code');
      return false;
    }
  };

  const signUp = async () => {
    try {
      const response = await api.auth.signUp({
        phoneNumber,
        countryCode: selectedCountry.code,
        referralCode,
        termsAccepted: agreedToTerms,
      });
      
      if (response.success && response.data) {
        await storage.setItem('userToken', response.data.token);
        await storage.setItem('userData', JSON.stringify(response.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Failed to create account');
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const isPhoneValid = await validatePhone();
      if (!isPhoneValid) return;

      const otpSent = await sendOtp();
      if (!otpSent) return;

      const signupSuccess = await signUp();
      if (!signupSuccess) return;

      router.push({
        pathname: "/verification",
        params: { 
          phoneNumber,
          countryCode: selectedCountry.code
        }
      });

    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Signup process error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        {/* Phone Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <CountryPicker
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
            />
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#666"
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Referral Code Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Referral Code</Text>
          <TextInput
            style={styles.referralInput}
            placeholder="Optional"
            value={referralCode}
            onChangeText={setReferralCode}
            placeholderTextColor="#666"
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Pressable 
            style={styles.checkbox}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms && <View style={styles.checked} />}
          </Pressable>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text 
              style={styles.termsLink}
              onPress={() => router.push("/terms")}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <Pressable 
          style={[
            styles.signUpButton, 
            !agreedToTerms && styles.signUpButtonDisabled,
            isLoading && styles.signUpButtonLoading
          ]}
          disabled={!agreedToTerms || isLoading}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>
            {isLoading ? 'Please wait...' : 'Sign Up'}
          </Text>
        </Pressable>

        {/* Social Sign Up */}
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>or Sign Up With</Text>
          <View style={styles.socialButtons}>
            <Pressable style={styles.socialButton}>
              <Image 
                source={require("../assets/google.png")} 
                style={styles.socialIcon} 
              />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Image 
                source={require("../assets/apple.png")} 
                style={styles.socialIcon} 
              />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Image 
                source={require("../assets/facebook.png")} 
                style={styles.socialIcon} 
              />
            </Pressable>
          </View>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an Account?{' '}
            <Text 
              style={styles.signInLink}
              onPress={() => router.push("/signin")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 56,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
  },
  referralInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
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
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: '#8A2BE2',
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
  signUpButtonLoading: {
    backgroundColor: '#9B59B6',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  orText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  signInText: {
    color: '#666',
    fontSize: 14,
  },
  signInLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
});