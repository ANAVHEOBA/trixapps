import { View, Text, TextInput, Image, Pressable, StyleSheet, SafeAreaView, Alert } from "react-native";
import { router } from "expo-router";
import { useState, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import storage from './utils/storage';


// API Configuration
const API_URI = 'http://10.0.2.2:8000/api'; // For Android Emulator
// const API_URI = 'http://localhost:8000/api'; // For iOS Simulator
// const API_URI = 'https://your-production-api.com/api'; // For Production

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default function SignUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);



  const validatePhone = async () => {
    try {
      const response = await fetch(`${API_URI}/auth/validate-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          countryCode: phoneInput.current?.getCountryCode() || 'US',
        }),
      });

      const data: ApiResponse = await response.json();
      return data.success;
    } catch (error) {
      console.error('Phone validation error:', error);
      return false;
    }
  };


  const sendOtp = async () => {
    try {
      const response = await fetch(`${API_URI}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          countryCode: phoneInput.current?.getCountryCode() || 'US',
        }),
      });

      const data: ApiResponse = await response.json();
      return data.success;
    } catch (error) {
      console.error('OTP sending error:', error);
      return false;
    }
  };


  const signUp = async () => {
    try {
      const response = await fetch(`${API_URI}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          countryCode: phoneInput.current?.getCountryCode() || 'US',
          referralCode: referralCode,
          termsAccepted: agreedToTerms,
        }),
      });

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        // Use our storage utility instead of AsyncStorage directly
        await storage.setItem('userToken', data.data.token);
        await storage.setItem('userData', JSON.stringify(data.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);

      // Validate phone number
      const isPhoneValid = await validatePhone();
      if (!isPhoneValid) {
        Alert.alert('Error', 'Invalid phone number');
        return;
      }

      // Send OTP
      const otpSent = await sendOtp();
      if (!otpSent) {
        Alert.alert('Error', 'Failed to send verification code');
        return;
      }


       // Create account
       const signupSuccess = await signUp();
       if (!signupSuccess) {
         Alert.alert('Error', 'Failed to create account');
         return;
       }
 
       // Navigate to verification page
       router.push({
         pathname: "/verification",
         params: { 
           phoneNumber: phoneNumber,
           countryCode: phoneInput.current?.getCountryCode() || 'US'
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
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="first"
            onChangeText={setPhoneNumber}
            onChangeFormattedText={setFormattedValue}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputText}
            textInputStyle={styles.phoneNumberText}
            codeTextStyle={styles.phoneCodeText}
            flagButtonStyle={styles.flagButton}
            countryPickerButtonStyle={styles.countryPickerButton}
            placeholder="Your phone number"
            autoFocus
          />
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
            Agree with {' '}
            <Text style={styles.termsLink}>Terms & Conditions</Text>
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
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  phoneInputText: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  phoneNumberText: {
    color: '#000000',
    fontSize: 16,
    height: 54,
    paddingVertical: 0,
  },
  phoneCodeText: {
    color: '#000000',
    fontSize: 16,
  },
  flagButton: {
    width: 80,
    height: 54,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryPickerButton: {
    width: 80,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
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

  signUpButtonLoading: {
    backgroundColor: '#9B59B6',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});