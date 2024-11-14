import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import Animated, { 
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function OnboardingScreen() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    
    // Navigate to splash screen after 2 seconds
    const timer = setTimeout(() => {
      router.push("/splash");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require("../../assets/logo.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});