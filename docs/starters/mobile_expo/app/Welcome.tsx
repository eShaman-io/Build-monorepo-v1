import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { theme } from "./theme";

export default function Welcome() {
  const scale = useSharedValue(1);
  const confetti = useRef<LottieView>(null);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.bg,
      }}
      accessible
      accessibilityLabel="Welcome screen"
    >
      <Animated.View
        style={[
          {
            padding: 24,
            borderRadius: 20,
            backgroundColor: "white",
            borderColor: theme.colors.primary,
            borderWidth: 1,
          },
          style,
        ]}
      >
        <Pressable
          accessibilityRole="button"
          onPressIn={() => (scale.value = withSpring(0.96))}
          onPressOut={() => (scale.value = withSpring(1))}
          onPress={() => {
            {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              confetti.current?.play();
            }
          }}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 16,
          }}
        >
          <Text style={{ fontSize: 18, color: theme.colors.fg }}>Let’s go</Text>
        </Pressable>
      </Animated.View>
      <LottieView
        ref={confetti}
        source={require("../assets/confetti.json")}
        autoPlay={false}
        loop={false}
        style={{ width: 220, height: 220 }}
      />
    </View>
  );
}
