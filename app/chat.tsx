import { View, Text, TextInput, Pressable, StyleSheet, Image, Animated } from "react-native";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./home";

const ChatMessage = ({ message }: { message: string }) => (
  <View style={styles.messageContainer}>
    <View style={styles.avatarContainer}>
      <Image 
        source={require("../assets/logo.png")} 
        style={styles.avatar}
      />
      <View style={styles.statusDot} />
    </View>
    <View style={styles.messageContent}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  </View>
);

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    const toValue = isMenuOpen ? -300 : 0;
    
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Main Chat Screen */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={toggleMenu}>
            <Ionicons name="menu" size={24} color="#000" />
          </Pressable>
          
          <Pressable style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade Plan</Text>
            <Ionicons name="add" size={20} color="#8A2BE2" />
          </Pressable>

          <Pressable onPress={() => router.push("/bookmarks")}>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Chat Area */}
        <View style={styles.chatArea}>
        <ChatMessage 
            message="Hey TRIX, I need your help again. Thinking about doing some therapy shopping, do you remember my last request?"
          />
          <Image 
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.actionCard}>
            <Text style={styles.actionTitle}>Explore Vendors Nearby</Text>
            <Text style={styles.actionDescription}>Find vendors near my location</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Text style={styles.actionTitle}>Continue My Last Prompt</Text>
            <Text style={styles.actionDescription}>Do you remember my last request?</Text>
          </Pressable>
        </View>

        {/* Bottom Input Bar */}
        <View style={styles.inputContainer}>
          <Pressable style={styles.mediaButton}>
            <Ionicons name="camera-outline" size={24} color="#666" />
          </Pressable>
          
          <Pressable style={styles.mediaButton}>
            <Ionicons name="images-outline" size={24} color="#666" />
          </Pressable>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Message"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Pressable style={styles.voiceButton}>
              <Ionicons name="mic-outline" size={24} color="#666" />
            </Pressable>
          </View>

          <Pressable style={styles.mediaButton}>
            <Ionicons name="headset-outline" size={24} color="#666" />
          </Pressable>
        </View>
      </View>

      {/* Side Menu */}
      <Animated.View 
        style={[
          styles.menuContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <HomeScreen />
      </Animated.View>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <Pressable 
          style={styles.overlay}
          onPress={toggleMenu}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  messageContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
  },

  statusDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#F8F0FF',
    padding: 16,
    borderRadius: 12,
    borderTopLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F0FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  upgradeText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '500',
  },
  chatArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    opacity: 0.2,
  },
  quickActions: {
    padding: 24,
    gap: 16,
  },
  actionCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  mediaButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  voiceButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});