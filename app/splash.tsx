import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import Animated, { 
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";

export default function SplashScreen() {
  const scale = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withDelay(100, withSpring(1));
    
    const timer = setTimeout(() => {
      router.push("/onboarding"); // Add leading slash here
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require("../assets/logo.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    tintColor: '#FFFFFF',
  },
});