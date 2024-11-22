import { View, Text, Pressable, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProductProgressScreen() {
  const [selectedPercentage, setSelectedPercentage] = useState('10%');
  const percentages = ['5%', '10%', '25%', '50%'];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <View style={styles.pointsBadge}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.pointsText}>18000</Text>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFF" />
          </Pressable>
        </View>
      </View>

      {/* Product Image */}
      <Image 
        source={require("../assets/corsair-headset.png")}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>VIRTUOSO RGB WIRELESS High-Fidelity Headset</Text>
          <Pressable style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={24} color="#666" />
          </Pressable>
        </View>

        <View style={styles.brandContainer}>
          <Ionicons name="person-circle-outline" size={20} color="#666" />
          <Text style={styles.brandText}>Corsair</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#8A2BE2" />
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progress:</Text>
          <View style={styles.progressInfo}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.progressText}>8,000/30,000</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '27%' }]} />
          </View>
        </View>

        {/* Contribution Section */}
        <View style={styles.contributionSection}>
          <TextInput
            style={styles.messageInput}
            placeholder="Leave Message"
            multiline
            placeholderTextColor="#666"
          />

          <Text style={styles.contributionLabel}>
            How Much would you like to Contribute?
          </Text>

          <View style={styles.percentagesContainer}>
            {percentages.map((percentage) => (
              <Pressable
                key={percentage}
                style={[
                  styles.percentageButton,
                  selectedPercentage === percentage && styles.selectedPercentage
                ]}
                onPress={() => setSelectedPercentage(percentage)}
              >
                <Text style={[
                  styles.percentageText,
                  selectedPercentage === percentage && styles.selectedPercentageText
                ]}>
                  {percentage}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.customButton}>
              <Text style={styles.customButtonText}>Custom</Text>
            </Pressable>
            <Pressable style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 24,
      paddingTop: 48,
    },
    pointsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F0FF',
      padding: 8,
      borderRadius: 20,
      gap: 8,
    },
    pointsText: {
      fontSize: 16,
      fontWeight: '600',
    },
    addButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#8A2BE2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImage: {
      width: '100%',
      height: 300,
      marginBottom: 24,
    },
    productInfo: {
      flex: 1,
      padding: 24,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    title: {
      flex: 1,
      fontSize: 24,
      fontWeight: '600',
      marginRight: 16,
    },
    shareButton: {
      padding: 4,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    brandText: {
      fontSize: 16,
      color: '#666',
      marginLeft: 8,
    },
    verifiedBadge: {
      marginLeft: 4,
    },
    progressContainer: {
      marginBottom: 32,
    },
    progressLabel: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    progressInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    progressText: {
      fontSize: 16,
      fontWeight: '500',
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: '#F0F0F0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#8A2BE2',
    },
    contributionSection: {
      marginTop: 24,
    },
    messageInput: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      padding: 16,
      height: 100,
      marginBottom: 24,
      fontSize: 16,
    },
    contributionLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 16,
    },
    percentagesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    percentageButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: '#F8F0FF',
      minWidth: 70,
      alignItems: 'center',
    },
    selectedPercentage: {
      backgroundColor: '#8A2BE2',
    },
    percentageText: {
      fontSize: 16,
      color: '#8A2BE2',
    },
    selectedPercentageText: {
      color: '#FFFFFF',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 16,
    },
    customButton: {
      flex: 1,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#8A2BE2',
    },
    customButtonText: {
      fontSize: 16,
      color: '#8A2BE2',
      fontWeight: '500',
    },
    redeemButton: {
      flex: 1,
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
      backgroundColor: '#8A2BE2',
      gap: 8,
    },
    redeemButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '500',
    },
  });