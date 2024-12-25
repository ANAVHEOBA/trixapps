import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';
import { TokenManager } from './utilities/tokenManager';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = () => {
    return username.trim().length > 0 && password.trim().length > 0;
  };

  const handleSignIn = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await ApiClient.post('/auth/login', {
        username: username.trim(),
        password: password.trim(),
        remember_me: rememberMe
      });

      if (response.success) {
        // Store token
        if (response.data?.token) {
          await TokenManager.setToken(response.data.token);
        }

        // Store user data
        if (response.data?.user) {
          await TokenManager.setUserData(response.data.user);
        }

        // Show success message and navigate
        Alert.alert(
          'Success',
          'Signed in successfully!',
          [
            {
              text: 'OK',
              onPress: () => router.push("/home")
            }
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred while signing in'
      );
    } finally {
      setIsLoading(false);
    }
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
        {/* Username Input */}
        <TextInput
          style={[styles.input, !username && styles.inputEmpty]}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!isLoading}
          placeholderTextColor="#666"
        />

        {/* Password Input */}
        <View style={[styles.passwordContainer, !password && styles.inputEmpty]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            editable={!isLoading}
            placeholderTextColor="#666"
          />
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#666"
            />
          </Pressable>
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.rememberContainer}>
          <Pressable 
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            disabled={isLoading}
          >
            <View style={[
              styles.checkbox,
              rememberMe && styles.checkboxSelected
            ]} />
            <Text style={styles.rememberText}>Remember Me</Text>
          </Pressable>
          <Pressable 
            onPress={() => router.push("/forgot-password")}
            disabled={isLoading}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
        </View>

        {/* Sign In Button */}
        <Pressable 
          style={[
            styles.signInButton,
            (!isFormValid() || isLoading) && styles.signInButtonDisabled
          ]}
          onPress={handleSignIn}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or Sign In With</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <Pressable 
            style={styles.socialButton}
            disabled={isLoading}
          >
            <Image 
              source={require("../assets/google.png")} 
              style={styles.socialIcon} 
            />
          </Pressable>
          <Pressable 
            style={styles.socialButton}
            disabled={isLoading}
          >
            <Image 
              source={require("../assets/apple.png")} 
              style={styles.socialIcon} 
            />
          </Pressable>
          <Pressable 
            style={styles.socialButton}
            disabled={isLoading}
          >
            <Image 
              source={require("../assets/facebook.png")} 
              style={styles.socialIcon} 
            />
          </Pressable>
        </View>

        {/* Sign Up Link */}
        <Text style={styles.signUpText}>
          Don't Have an Account?{' '}
          <Text 
            style={styles.signUpLink} 
            onPress={() => router.push("/signup")}
          >
            Sign Up
          </Text>
        </Text>
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
    gap: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  inputEmpty: {
    borderColor: '#FF0000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    padding: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#8A2BE2',
  },
  rememberText: {
    fontSize: 16,
    color: '#666',
  },
  forgotText: {
    color: '#8A2BE2',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  signUpText: {
    textAlign: 'center',
    color: '#666',
  },
  signUpLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
});