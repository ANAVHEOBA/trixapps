import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_URL = 'http://192.168.241.236:8000/api';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const { phone, countryCode } = params;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken();
    getProfile();
  }, []);

  // Get token from storage
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  // Get existing profile if any
  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFullName(data.data.fullName || '');
        setEmail(data.data.email || '');
        setGender(data.data.gender || '');
        if (data.data.dob) {
          // Convert YYYY-MM-DD to DD/MM/YYYY if needed
          const [year, month, day] = data.data.dob.split('-');
          setDob(`${day}/${month}/${year}`);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Parse DD/MM/YYYY string to Date
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Validate date format and range
  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    
    // Check format
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    // Parse date
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // Check if valid date and not in future
    return date instanceof Date && 
           !isNaN(date.getTime()) && 
           date <= new Date() &&
           year >= 1900;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setDob(formattedDate);
    }
  };

  // Format date for display
  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    
    const [day, month, year] = dateString.split('/');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  // Update profile
  const updateProfile = async () => {
    try {
      if (!validateDate(dob)) {
        Alert.alert('Error', 'Please enter a valid date of birth');
        return;
      }

      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          gender,
          dob,
          phone,
          countryCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      await AsyncStorage.setItem('userData', JSON.stringify(data.data));
      router.push("/category");

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

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
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.description}>
        Complete your profile by providing additional details{'\n'}
        to help us know more about and better serve you.
      </Text>

      {/* Form Fields */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable
          style={styles.input}
          onPress={() => setShowGenderDropdown(!showGenderDropdown)}
        >
          <Text style={gender ? styles.inputText : styles.placeholder}>
            {gender || 'Select Gender'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </Pressable>

        {showGenderDropdown && (
          <View style={styles.dropdown}>
            {genderOptions.map((option) => (
              <Pressable
                key={option}
                style={styles.dropdownItem}
                onPress={() => {
                  setGender(option);
                  setShowGenderDropdown(false);
                }}
              >
                <Text>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={dob ? styles.inputText : styles.placeholder}>
            {dob ? formatDisplayDate(dob) : 'Enter DOB'}
          </Text>
          <Text style={styles.calendarIcon}>📅</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={dob ? parseDate(dob) || new Date() : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View 
            key={index}
            style={[
              styles.progressDot,
              index === 1 ? styles.progressDotActive : null
            ]} 
          />
        ))}
      </View>

      {/* Confirm Button */}
      <Pressable 
        style={[
          styles.confirmButton,
          ((!fullName || !email || !gender || !dob) || isLoading) && 
          styles.confirmButtonDisabled
        ]}
        onPress={updateProfile}
        disabled={!fullName || !email || !gender || !dob || isLoading}
      >
        <Text style={styles.confirmButtonText}>
          {isLoading ? 'Updating...' : 'Confirm'}
        </Text>
      </Pressable>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already Have an Account? <Text style={styles.signInLink} onPress={() => router.push("/signin")}>Sign in</Text>
      </Text>
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
  form: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  calendarIcon: {
    fontSize: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    backgroundColor: '#8A2BE2',
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