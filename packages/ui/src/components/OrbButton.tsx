import React from "react";

type OrbButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function OrbButton({ onPress, title, disabled = false }: OrbButtonProps) {
  if (isReactNative) {
    // React Native version with dynamic imports
    const { Pressable, Text } = require("react-native");
    
    return React.createElement(
      Pressable,
      {
        onPress: disabled ? undefined : onPress,
        className: `rounded-full p-4 ${
          disabled 
            ? "bg-gray-400" 
            : "bg-brand-secondary"
        }`
      },
      React.createElement(Text, { className: "text-center text-lg font-bold text-white" }, title)
    );
  }

  // Web version using regular button
  return (
    <button
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
      className={`rounded-full p-4 text-center text-lg font-bold text-white ${
        disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-brand-secondary hover:bg-brand-secondary/80 cursor-pointer"
      }`}
    >
      {title}
    </button>
  );
}
