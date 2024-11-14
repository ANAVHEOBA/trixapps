import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

type Category = "reward" | "games" | "casual" | "other";

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [otherText, setOtherText] = useState("");

  const handleConfirm = () => {
    if (selectedCategory || (selectedCategory === "other" && otherText)) {
      router.push("/signin-details");
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
      <Text style={styles.title}>Choose Your Category</Text>
      <Text style={styles.description}>
        Help us personalize your experience by selecting the{'\n'}
        option that best describes and earn unique rewards.
      </Text>

      {/* Category Options */}
      <View style={styles.categoryContainer}>
        <Pressable 
          style={[
            styles.categoryButton,
            selectedCategory === "reward" && styles.categoryButtonSelected
          ]}
          onPress={() => setSelectedCategory("reward")}
        >
          <Text style={styles.categoryText}>I'm a Reward Seeker</Text>
          <View style={[
            styles.checkbox,
            selectedCategory === "reward" && styles.checkboxSelected
          ]} />
        </Pressable>

        <Pressable 
          style={[
            styles.categoryButton,
            selectedCategory === "games" && styles.categoryButtonSelected
          ]}
          onPress={() => setSelectedCategory("games")}
        >
          <Text style={styles.categoryText}>I'm a Games/Tech Enthusiast</Text>
          <View style={[
            styles.checkbox,
            selectedCategory === "games" && styles.checkboxSelected
          ]} />
        </Pressable>

        <Pressable 
          style={[
            styles.categoryButton,
            selectedCategory === "casual" && styles.categoryButtonSelected
          ]}
          onPress={() => setSelectedCategory("casual")}
        >
          <Text style={styles.categoryText}>I'm a Casual Shopper</Text>
          <View style={[
            styles.checkbox,
            selectedCategory === "casual" && styles.checkboxSelected
          ]} />
        </Pressable>

        <View style={styles.otherContainer}>
          <Text style={styles.otherLabel}>Others</Text>
          <TextInput
            style={styles.otherInput}
            placeholder="I'm a..."
            value={otherText}
            onChangeText={(text) => {
              setOtherText(text);
              setSelectedCategory("other");
            }}
          />
        </View>
      </View>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View 
            key={index}
            style={[
              styles.progressDot,
              index === 2 ? styles.progressDotActive : null
            ]} 
          />
        ))}
      </View>

      {/* Confirm Button */}
      <Pressable 
        style={[
          styles.confirmButton,
          (!selectedCategory || (selectedCategory === "other" && !otherText)) && 
          styles.confirmButtonDisabled
        ]}
        onPress={handleConfirm}
        disabled={!selectedCategory || (selectedCategory === "other" && !otherText)}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </Pressable>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already Have an Account? <Text style={styles.signInLink} onPress={() => router.push("/signin")}>Sign in</Text>
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
  categoryContainer: {
    gap: 16,
    marginBottom: 32,
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
  },
  categoryButtonSelected: {
    borderColor: '#8A2BE2',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  otherLabel: {
    fontSize: 16,
    color: '#000',
    width: 60,
  },
  otherInput: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
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
  confirmButton: {
    backgroundColor: '#8A2BE2',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
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