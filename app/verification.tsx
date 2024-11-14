import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";

export default function VerificationScreen() {
    const [timer, setTimer] = useState(24);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

   // Move to next input if value exists
   if (value && index < 3) {
    inputRefs.current[index + 1]?.focus();
  }
};

  // Handle backspace
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
        code to your number ending with ******0018.
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

      {/* Timer */}
      <Text style={styles.timer}>
        {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`} till code expires
      </Text>

      {/* Resend Code */}
      <Pressable onPress={() => setTimer(24)}>
        <Text style={styles.resendText}>
          Didn't Receive a Code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </Pressable>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View 
            key={index}
            style={[
              styles.progressDot,
              index === 0 ? styles.progressDotActive : null
            ]} 
          />
        ))}
      </View>

      {/* Verify Button */}
      <Pressable 
        style={[
          styles.verifyButton,
          otp.every(digit => digit) ? null : styles.verifyButtonDisabled
        ]}
        onPress={() => router.push("/profile")}
        disabled={!otp.every(digit => digit)}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  timer: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  resendText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 48,
  },
  resendLink: {
    color: '#8A2BE2',
    fontWeight: '600',
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