import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function ForgotPasswordEmailScreen() {
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
        the email associated with your account.
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      {/* Alternative Method Link */}
      <Pressable onPress={() => router.push("/forgot-password")}>
        <Text style={styles.alternativeText}>Use a different Method?</Text>
      </Pressable>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        {/* Confirm Button */}
        <Pressable 
          style={[
            styles.confirmButton,
            (!email || !isValidEmail(email)) && styles.confirmButtonDisabled
          ]}
          onPress={() => router.push("/verification")}
          disabled={!email || !isValidEmail(email)}
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
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
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