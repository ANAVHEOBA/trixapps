import { View, Text, Pressable, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TwitchDetailScreen() {
  const [activeTab, setActiveTab] = useState('Description');
  const [twitchId, setTwitchId] = useState('DisguisedPlayer');
  const [amount, setAmount] = useState('40');
  const presetAmounts = ['$10', '$25', '$50', '$100'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </View>
        </Pressable>
        
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.pointsText}>12000</Text>
          <Ionicons name="add" size={20} color="#FFF" />
        </View>

        <Pressable>
          <View style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={24} color="#FFF" />
          </View>
        </Pressable>
      </View>

      <ScrollView>
        {/* Hero Image */}
        <Image 
          source={require('../assets/twitch-hero.png')}
          style={styles.heroImage}
        />

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceHeader}>
            <Image 
              source={require('../assets/twitch-icon.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceName}>TwitchTV</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#8A2BE2" />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <Pressable 
              style={[styles.tab, activeTab === 'Description' && styles.activeTab]}
              onPress={() => setActiveTab('Description')}
            >
              <Text style={[styles.tabText, activeTab === 'Description' && styles.activeTabText]}>
                Description
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
              onPress={() => setActiveTab('Reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>
                Reviews
              </Text>
            </Pressable>
          </View>

          {/* Description Content */}
          <View style={styles.content}>
            <Text style={styles.aboutTitle}>About Twitch</Text>
            <Text style={styles.description}>
              Immerse yourself in high-fidelity audio with the Virtuoso RGB Wireless headset, designed for the discerning gamer. Featuring customizable RGB lighting, precision-tuned 50mm neodymiu...
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>Select Country</Text>
              <Pressable style={styles.countrySelector}>
                <Image 
                  source={require('../assets/nigeria-flag.png')}
                  style={styles.flag}
                />
                <Text style={styles.countryText}>Nigeria</Text>
                <Ionicons name="chevron-down" size={24} color="#000" />
              </Pressable>

              <Text style={styles.label}>Twitch ID</Text>
              <TextInput
                style={styles.input}
                value={twitchId}
                onChangeText={setTwitchId}
                placeholder="Enter your Twitch ID"
              />

              <View style={styles.amountPresets}>
                {presetAmounts.map((preset, index) => (
                  <Pressable 
                    key={index}
                    style={styles.presetButton}
                  >
                    <Text style={styles.presetText}>{preset}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountInput}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Price:</Text>
                <View style={styles.totalPoints}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.totalAmount}>2000</Text>
                </View>
              </View>

              <Pressable style={styles.redeemButton}>
                <Text style={styles.redeemText}>Redeem</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6441A5', // Twitch purple
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 24,
      paddingTop: 48,
    },
    backButton: {
      width: 40,
      height: 40,
      backgroundColor: '#FFF',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#8A2BE2',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 4,
    },
    pointsText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '500',
    },
    wishlistButton: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    serviceInfo: {
      flex: 1,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
      padding: 24,
    },
    serviceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    serviceIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    serviceName: {
      fontSize: 24,
      fontWeight: '600',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F0FF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    ratingText: {
      fontSize: 14,
      color: '#8A2BE2',
      fontWeight: '500',
    },
    tabs: {
      flexDirection: 'row',
      marginTop: 24,
      gap: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: '#F8F0FF',
    },
    tabText: {
      fontSize: 16,
      color: '#666',
    },
    activeTabText: {
      color: '#8A2BE2',
      fontWeight: '500',
    },
    content: {
      marginTop: 24,
    },
    aboutTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
    form: {
      marginTop: 24,
      gap: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
    },
    countrySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      gap: 12,
    },
    flag: {
      width: 24,
      height: 24,
    },
    countryText: {
      flex: 1,
      fontSize: 16,
    },
    input: {
      padding: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      fontSize: 16,
    },
    amountPresets: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    presetButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#F8F0FF',
      borderRadius: 20,
    },
    presetText: {
      fontSize: 14,
      color: '#8A2BE2',
    },
    amountInput: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    currencySymbol: {
      fontSize: 16,
      fontWeight: '500',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '500',
    },
    totalPoints: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    totalAmount: {
      fontSize: 24,
      fontWeight: '600',
    },
    redeemButton: {
      backgroundColor: '#8A2BE2',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
    },
    redeemText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '500',
    },
  });