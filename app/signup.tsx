import { View, Text, TextInput, Image, Pressable, StyleSheet, Alert, Modal, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

const API_URL = 'http://192.168.172.236:8001/api'; 

// Define country interface
interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

// Countries data
const countries: Country[] = [
  { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
  { name: "Nigeria", code: "NG", dial_code: "+234", flag: "🇳🇬" },
  { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" },
  { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
  { name: "Australia", code: "AU", dial_code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dial_code: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial_code: "+33", flag: "🇫🇷" },
  { name: "Brazil", code: "BR", dial_code: "+55", flag: "🇧🇷" },
  { name: "Japan", code: "JP", dial_code: "+81", flag: "🇯🇵" },
  // Add more countries as needed
];

export default function SignUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  // Validate phone number
  const validatePhone = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/auth/validate-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          countryCode: selectedCountry.code
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Phone validation failed');
      }

      // If phone is valid, send OTP
      await sendOtp();

    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP
  const sendOtp = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          countryCode: selectedCountry.code
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      router.push({
        pathname: "/verification",
        params: { 
          phone: phoneNumber,
          countryCode: selectedCountry.code
        }
      });

    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  // Verify referral code
  const verifyReferralCode = async () => {
    if (!referralCode) return;

    try {
      const response = await fetch(`${API_URL}/referral/verify/${referralCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid referral code');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
      setReferralCode('');
    }
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!phoneNumber || !agreedToTerms) {
      Alert.alert('Error', 'Please fill in all required fields and accept terms');
      return;
    }

    if (referralCode) {
      await verifyReferralCode();
    }

    await validatePhone();
  };

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
          <Pressable 
            style={styles.countrySelector}
            onPress={() => setShowCountryModal(true)}
          >
            <Text>{selectedCountry.flag} {selectedCountry.dial_code}</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Phone No."
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Country Selection Modal */}
        <Modal
          visible={showCountryModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <ScrollView>
                {countries.map((country) => (
                  <Pressable
                    key={country.code}
                    style={styles.countryItem}
                    onPress={() => {
                      setSelectedCountry(country);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text>{country.flag} {country.name} ({country.dial_code})</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                style={styles.closeButton}
                onPress={() => setShowCountryModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
          style={[
            styles.signUpButton, 
            (!agreedToTerms || isLoading) && styles.signUpButtonDisabled
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
              onPress={() => router.push("/signins")}
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },


  countrySelector: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
});