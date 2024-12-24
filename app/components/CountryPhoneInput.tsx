import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native';
import CountryPicker, { 
  Country, 
  CountryCode,
  DARK_THEME,
  DEFAULT_THEME
} from 'react-native-country-picker-modal';
import { useColorScheme } from 'react-native';

interface CountryPhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  countryCode: CountryCode;
  onChangeCountry: (country: Country) => void;
  error?: string;
  containerStyle?: object;
}

export default function CountryPhoneInput({
  value,
  onChangeText,
  countryCode,
  onChangeCountry,
  error,
  containerStyle
}: CountryPhoneInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const colorScheme = useColorScheme();

  const onSelect = (country: Country) => {
    setCountry(country);
    onChangeCountry(country);
    setIsVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <Pressable 
          style={styles.countryButton}
          onPress={() => setIsVisible(true)}
        >
          <CountryPicker
            theme={colorScheme === 'dark' ? DARK_THEME : DEFAULT_THEME}
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              withCountryNameButton: false,
              withCallingCodeButton: true,
              withEmoji: true,
              onSelect,
            }}
            visible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </Pressable>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#666"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 56,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    height: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
});