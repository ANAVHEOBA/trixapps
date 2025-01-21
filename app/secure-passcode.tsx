import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from "./utilities/apiClient";
import { TokenManager } from './utilities/tokenManager';

export default function SecurePasscodeScreen() {
  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [confirmPasscode, setConfirmPasscode] = useState(['', '', '', '']);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetPin = async (pin: string) => {
    try {
      setIsLoading(true);
      const response = await ApiClient.post('/wallet/set-pin', { pin });
      
      if (response.success) {
        Alert.alert(
          'Success',
          'PIN set successfully! Please sign in to continue.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Clear any stored tokens/data before navigating to sign in
                TokenManager.clearAll().then(() => {
                  router.push('/signins');
                });
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to set PIN. Please try again.');
        resetPasscodes();
      }
    } catch (error) {
      console.error('Set PIN error:', error);
      Alert.alert('Error', 'Failed to set PIN. Please try again.');
      resetPasscodes();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPin = async (pin: string) => {
    try {
      setIsLoading(true);
      await ApiClient.post('/wallet/verify-pin', { pin });
      return true;
    } catch (error) {
      Alert.alert('Error', 'PIN verification failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPasscodes = () => {
    setPasscode(['', '', '', '']);
    setConfirmPasscode(['', '', '', '']);
    setIsConfirming(false);
  };

  const handleNumberPress = async (number: string) => {
    const currentPasscode = isConfirming ? confirmPasscode : passcode;
    const currentIndex = currentPasscode.findIndex(digit => digit === '');
    
    if (currentIndex !== -1) {
      const newPasscode = [...currentPasscode];
      newPasscode[currentIndex] = number;
      
      if (isConfirming) {
        setConfirmPasscode(newPasscode);
      } else {
        setPasscode(newPasscode);
      }

      // If this was the last digit
      if (currentIndex === 3) {
        const pin = newPasscode.join('');
        
        if (!isConfirming) {
          // First entry complete, move to confirmation
          setIsConfirming(true);
          setConfirmPasscode(['', '', '', '']);
        } else {
          // Confirming PIN
          const originalPin = passcode.join('');
          if (pin === originalPin) {
            // PINs match, proceed with setting
            await handleSetPin(pin);
          } else {
            Alert.alert('Error', 'PINs do not match. Please try again.');
            resetPasscodes();
          }
        }
      }
    }
  };

  const handleDelete = () => {
    const currentPasscode = isConfirming ? confirmPasscode : passcode;
    const lastFilledIndex = currentPasscode.map(digit => digit !== '').lastIndexOf(true);
    
    if (lastFilledIndex !== -1) {
      const newPasscode = [...currentPasscode];
      newPasscode[lastFilledIndex] = '';
      
      if (isConfirming) {
        setConfirmPasscode(newPasscode);
      } else {
        setPasscode(newPasscode);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isConfirming ? 'Confirm Your Passcode' : 'Secure Your Wallet with a Passcode'}
        </Text>
      </View>

      {/* Passcode Display */}
      <View style={styles.passcodeContainer}>
        {(isConfirming ? confirmPasscode : passcode).map((digit, index) => (
          <View 
            key={index} 
            style={[
              styles.passcodeDigit,
              digit ? styles.passcodeDigitFilled : null
            ]} 
          />
        ))}
      </View>

      <Text style={styles.infoText}>
        {isConfirming 
          ? 'Please enter your PIN again to confirm'
          : "Please don't lose this PIN! You will need it to confirm transactions and access your wallet."}
      </Text>

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Pressable
            key={number}
            style={[styles.numberButton, isLoading && styles.numberButtonDisabled]}
            onPress={() => !isLoading && handleNumberPress(number.toString())}
            disabled={isLoading}
          >
            <Text style={styles.numberText}>{number}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.numberButton}>
          <Text style={styles.numberText}></Text>
        </Pressable>
        <Pressable
          style={[styles.numberButton, isLoading && styles.numberButtonDisabled]}
          onPress={() => !isLoading && handleNumberPress('0')}
          disabled={isLoading}
        >
          <Text style={styles.numberText}>0</Text>
        </Pressable>
        <Pressable
          style={[styles.numberButton, isLoading && styles.numberButtonDisabled]}
          onPress={handleDelete}
          disabled={isLoading}
        >
          <Ionicons name="backspace-outline" size={24} color="#000" />
        </Pressable>
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
  header: {
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  passcodeDigit: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  passcodeDigitFilled: {
    backgroundColor: '#8A2BE2',
  },
  infoText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    marginBottom: 48,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  numberButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },

  numberButtonDisabled: {
    opacity: 0.5,
  },
});