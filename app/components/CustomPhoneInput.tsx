import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface CustomPhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  onChangeCountryCode: (code: string) => void;
  containerStyle?: any;
}

export default function CustomPhoneInput({
  value,
  onChangeText,
  countryCode,
  onChangeCountryCode,
  containerStyle,
}: CustomPhoneInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.countryCode}>
        <Text style={styles.countryCodeText}>+{countryCode}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        placeholder="Phone number"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCode: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000000',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
});