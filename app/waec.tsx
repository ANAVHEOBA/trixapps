import { View, Text, StyleSheet, Image, Pressable, ScrollView, Modal } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from './utilities/apiClient';

const EDUCATIONAL_VOUCHERS = [
  { 
    id: 'waec', 
    name: 'WAEC Result Checker', 
    amount: 3750,
    logo: require('../assets/education/waec-logo.png'),
    smallLogo: require('../assets/education/waec-small.jpeg')
  },
  { 
    id: 'neco', 
    name: 'NECO Result Checker', 
    amount: 1200,
    logo: require('../assets/education/neco-logo.png'),
    smallLogo: require('../assets/education/neco-small.jpeg')
  },
  { 
    id: 'utme', 
    name: 'JAMB UTME', 
    amount: 6200,
    logo: require('../assets/education/jamb-logo.png'),
    smallLogo: require('../assets/education/jamb-small.jpeg')
  },
  { 
    id: 'utme_mock', 
    name: 'JAMB UTME MOCK', 
    amount: 7700,
    logo: require('../assets/education/jamb-logo.png'),
    smallLogo: require('../assets/education/jamb-small.jpeg')
  },
  { 
    id: 'de', 
    name: 'JAMB DE', 
    amount: 6200,
    logo: require('../assets/education/jamb-logo.png'),
    smallLogo: require('../assets/education/jamb-small.jpeg')
  }
];

export default function WAECScreen() {
  const [selectedVoucher, setSelectedVoucher] = useState(EDUCATIONAL_VOUCHERS[0]);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>

          <View style={styles.balanceContainer}>
            <Image 
              source={require("../assets/icons/coin.png")}
              style={styles.coinIcon}
            />
            <Text style={styles.balanceText}>12000</Text>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color="#8A2BE2" />
          </Pressable>
        </View>
      </View>

      {/* Brand Banner */}
      <View style={[styles.brandBanner, { backgroundColor: '#F8F0FF' }]}>
        <Image 
          source={selectedVoucher.logo}
          style={styles.bannerLogo}
        />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        <View style={styles.contentContainer}>
          {/* Brand Info */}
          <View style={styles.brandInfoSection}>
            <View style={styles.brandHeader}>
              <View style={styles.brandTitleContainer}>
                <Image 
                  source={selectedVoucher.smallLogo}
                  style={styles.smallLogo}
                />
                <Text style={styles.brandName}>{selectedVoucher.name}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#8A2BE2" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Voucher Selection */}
            <View style={styles.voucherSection}>
              <Text style={styles.label}>Select Voucher Type</Text>
              <Pressable 
                style={styles.voucherSelector}
                onPress={() => setShowVoucherModal(true)}
              >
                <Text style={styles.voucherText}>{selectedVoucher.name}</Text>
                <Ionicons name="chevron-down" size={24} color="#8A2BE2" />
              </Pressable>
            </View>

            {/* Amount Display */}
            <View style={styles.amountSection}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountDisplay}>
                <Text style={styles.currencySymbol}>₦</Text>
                <Text style={styles.amountText}>
                  {selectedVoucher.amount.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Total Price */}
            <View style={styles.totalPriceSection}>
              <Text style={styles.totalPriceLabel}>Total Price:</Text>
              <View style={styles.priceContainer}>
                <Image 
                  source={require("../assets/icons/coin.png")}
                  style={styles.coinIcon}
                />
                <Text style={styles.priceText}>
                  ₦{selectedVoucher.amount.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Purchase Button */}
            <Pressable 
              style={styles.purchaseButton}
              onPress={() => router.push('/payment-confirmation')}
            >
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Voucher Selection Modal */}
      <Modal
        visible={showVoucherModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowVoucherModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Voucher Type</Text>
            <ScrollView>
              {EDUCATIONAL_VOUCHERS.map((voucher) => (
                <Pressable
                  key={voucher.id}
                  style={styles.voucherOption}
                  onPress={() => handleVoucherSelect(voucher)}
                >
                  <View style={styles.voucherInfo}>
                    <Image 
                      source={voucher.smallLogo}
                      style={styles.voucherLogo}
                    />
                    <View>
                      <Text style={styles.voucherName}>{voucher.name}</Text>
                      <Text style={styles.voucherPrice}>
                        ₦{voucher.amount.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  {selectedVoucher.id === voucher.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#8A2BE2" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowVoucherModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: '#F5F5F5',
    paddingTop: 44,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    width: 28,
    height: 28,
    backgroundColor: '#333333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
  heartButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandBanner: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerLogo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  brandInfoSection: {
    marginBottom: 24,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  formSection: {
    gap: 24,
  },
  voucherSection: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  voucherSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 56,
  },
  voucherText: {
    fontSize: 16,
    color: '#333',
  },
  amountSection: {
    gap: 8,
  },
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 56,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  amountText: {
    fontSize: 16,
    color: '#333',
  },
  totalPriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  purchaseButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  voucherOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  voucherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  voucherLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  voucherName: {
    fontSize: 16,
    color: '#333',
  },
  voucherPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});