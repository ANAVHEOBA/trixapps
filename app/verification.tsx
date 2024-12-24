import { View, Text, Pressable, StyleSheet, TextInput, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";

// API Configuration
const API_URL = 'http://192.168.241.236:8000/api';

export default function VerificationScreen() {
    const params = useLocalSearchParams();
    const { phone, countryCode } = params;
    
    const [timer, setTimer] = useState(60); // 60 seconds timer
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
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

    // Verify OTP
    const verifyOtp = async () => {
        try {
            setIsLoading(true);
            const otpString = otp.join('');
            
            const response = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    countryCode: countryCode,
                    otp: otpString
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            // If verification successful, proceed to profile
            router.push("/profile");

        } catch (error: any) {
            Alert.alert(
                'Verification Failed', 
                error.message || 'Please check your OTP and try again'
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const resendOtp = async () => {
        if (timer > 0) return;

        try {
            setIsLoading(true);
            
            const response = await fetch(`${API_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    countryCode: countryCode
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP');
            }

            // Reset timer and show success message
            setTimer(60);
            setOtp(['', '', '', '']);
            Alert.alert('Success', 'New OTP has been sent to your phone');

        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to resend OTP');
        } finally {
            setIsLoading(false);
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
                code to your number ending with {phone?.slice(-4)}.
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[
                            styles.otpInput,
                            otp[index] && styles.otpInputFilled
                        ]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={otp[index]}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        editable={!isLoading}
                    />
                ))}
            </View>

            {/* Timer */}
            <Text style={styles.timer}>
                {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`} till code expires
            </Text>

            {/* Resend Code */}
            <Pressable 
                onPress={resendOtp}
                disabled={timer > 0 || isLoading}
            >
                <Text style={[
                    styles.resendText,
                    (timer > 0 || isLoading) && styles.resendTextDisabled
                ]}>
                    Didn't Receive a Code? {' '}
                    <Text style={styles.resendLink}>Resend</Text>
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
                    (otp.includes('') || isLoading) && styles.verifyButtonDisabled
                ]}
                onPress={verifyOtp}
                disabled={otp.includes('') || isLoading}
            >
                <Text style={styles.verifyButtonText}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </Text>
            </Pressable>

            {/* Sign In Link */}
            <Text style={styles.signInText}>
                Already Have an Account? {' '}
                <Text 
                    style={styles.signInLink} 
                    onPress={() => router.push("/signin")}
                >
                    Sign in
                </Text>
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
        borderColor: '#E0E0E0',
        borderRadius: 12,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#F8F8F8',
    },
    otpInputFilled: {
        borderColor: '#8A2BE2',
        backgroundColor: '#F0E6FF',
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
    resendTextDisabled: {
        opacity: 0.5,
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