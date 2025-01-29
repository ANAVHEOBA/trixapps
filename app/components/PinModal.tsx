import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface PinModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  isProcessing: boolean;
}

export default function PinModal({ visible, onClose, onSubmit, isProcessing }: PinModalProps) {
  const [pin, setPin] = useState('');

  const handlePinInput = (number: string) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);
      if (newPin.length === 4) {
        onSubmit(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < pin.length && styles.dotFilled
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>

          <Text style={styles.title}>Enter PIN</Text>
          <Text style={styles.subtitle}>Enter your 4-digit PIN to confirm purchase</Text>

          {renderPinDots()}

          <View style={styles.keypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'].map((num, index) => (
              <Pressable
                key={index}
                style={[
                  styles.keypadButton,
                  typeof num !== 'number' && num !== 'delete' && styles.keypadButtonEmpty
                ]}
                onPress={() => {
                  if (typeof num === 'number') handlePinInput(num.toString());
                  else if (num === 'delete') handleDelete();
                }}
                disabled={isProcessing}
              >
                {num === 'delete' ? (
                  <Ionicons name="backspace-outline" size={24} color="#000" />
                ) : (
                  <Text style={styles.keypadButtonText}>{num}</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingBottom: 40,
    },
    closeButton: {
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 1,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 32,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 32,
    },
    dot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#F5F5F5',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    dotFilled: {
      backgroundColor: '#8A2BE2',
      borderColor: '#8A2BE2',
    },
    keypad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
      paddingHorizontal: 20,
    },
    keypadButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
      // For iOS shadow
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // For Android shadow
      elevation: 2,
    },
    keypadButtonEmpty: {
      backgroundColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    keypadButtonText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
    },
    keypadButtonDelete: {
      backgroundColor: '#FFE5E5',
    },
    processingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
    },
    processingText: {
      fontSize: 16,
      color: '#666',
      marginTop: 12,
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
    },
    forgotPin: {
      marginTop: 16,
      alignSelf: 'center',
    },
    forgotPinText: {
      color: '#8A2BE2',
      fontSize: 14,
      textDecorationLine: 'underline',
    }
  });