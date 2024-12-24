import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OnboardingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      router.push("/splash");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isVisible && (
        <Animated.Image 
          entering={FadeIn.duration(1000)}
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
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