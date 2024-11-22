import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState, useRef } from "react";

export default function ForgotPasswordEmailVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value exists
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.description}>
        For your security, we have sent a 4-digit verification{'\n'}
        code to your email address. <Text style={styles.email}>Email****@gmail.com</Text>
      </Text>

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {/* Alternative Method Link */}
      <Pressable onPress={() => router.push("/forgot-password")}>
        <Text style={styles.alternativeText}>Use a different Method?</Text>
      </Pressable>

      {/* Resend Code */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn't Receive a Code? <Text style={styles.resendLink} onPress={() => {/* Handle resend */}}>Resend</Text>
        </Text>
      </View>

      {/* Verify Button */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={[
            styles.verifyButton,
            !otp.every(digit => digit) && styles.verifyButtonDisabled
          ]}
          onPress={() => router.push("/reset-password")}
          disabled={!otp.every(digit => digit)}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
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
  email: {
    color: '#8A2BE2',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
  },
  alternativeText: {
    color: '#8A2BE2',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 16,
  },
  resendLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  verifyButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
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