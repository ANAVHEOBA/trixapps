import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function UpdateProfileScreen() {
  const [category, setCategory] = useState("Games/Tech Enthusiast");
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePicture}>
            <Pressable style={styles.editIcon}>
              <Ionicons name="settings" size={24} color="#FFF" />
            </Pressable>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Ezzy Rider"
            placeholderTextColor="#000"
          />
          
          <TextInput
            style={styles.input}
            placeholder="ItsEzzy@gmail.com"
            placeholderTextColor="#000"
            keyboardType="email-address"
          />

          <View style={styles.input}>
            <View style={styles.phonePrefix}>
              <Image source={require('../assets/flag.png')} style={styles.flag} />
              <Text>+234</Text>
            </View>
            <TextInput
              placeholder="816 000 2000"
              placeholderTextColor="#000"
              keyboardType="phone-pad"
              style={styles.phoneInput}
            />
          </View>

          <Pressable style={styles.input}>
            <Text style={styles.inputText}>Male</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </Pressable>

          <Pressable style={styles.input}>
            <Text style={styles.inputText}>September 22, 2000</Text>
            <Ionicons name="calendar-outline" size={20} color="#8A2BE2" />
          </Pressable>
        </View>

        {/* Personalized Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Category</Text>
          <Pressable style={styles.input}>
            <Text style={styles.inputText}>I'm a {category}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </Pressable>
        </View>

        {/* Short Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Short Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset"
            placeholderTextColor="#000"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.input}>
            <Text style={styles.inputText}>SocialTag</Text>
            <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputText}>SocialTag</Text>
            <Ionicons name="logo-instagram" size={20} color="#E4405F" />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputText}>SocialTag</Text>
            <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputText}>SocialTag</Text>
            <Ionicons name="paper-plane" size={20} color="#0088CC" />
          </View>
        </View>

        {/* Update Button */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.updateButton}
            onPress={() => {
              // Handle update logic
              router.back();
            }}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F0FF',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#8A2BE2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 8,
  },
  flag: {
    width: 24,
    height: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    padding: 24,
  },
  updateButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});