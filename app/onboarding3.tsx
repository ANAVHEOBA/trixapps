import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function OnboardingPage3() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Make Your Purchase Dreams come True</Text>
        <Text style={styles.subtitle}>
          Create&Fund or contribute to others by creating dream paths and fulfill wishes with Trix
        </Text>
        <Pressable 
          style={styles.button}
          onPress={() => router.push("/signup")} // Navigate to your main app screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
      <View style={styles.pagination}>
        <View style={[styles.paginationDot, styles.inactiveDot]} />
        <View style={[styles.paginationDot, styles.inactiveDot]} />
        <View style={styles.paginationDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8A2BE2',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});