import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import confettiJson from "../assets/confetti.json";

export default function Welcome() {
  const scale = useSharedValue(1);
  const confetti = useRef<LottieView>(null);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} accessible accessibilityLabel="Welcome screen">
      <Animated.View style={[{ padding: 24, borderRadius: 20 }, style]}>
        <Pressable
          accessibilityRole="button"
          onPressIn={() => (scale.value = withSpring(0.96))}
          onPressOut={() => (scale.value = withSpring(1))}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            confetti.current?.play();
          }}
          style={{ paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16, borderWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>Let’s go</Text>
        </Pressable>
      </Animated.View>

      <LottieView
        ref={confetti}
        source={confettiJson}
        autoPlay={false}
        loop={false}
        style={{ width: 220, height: 220 }}
      />
    </View>
  );
}
