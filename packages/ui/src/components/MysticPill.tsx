import React from "react";

type MysticPillProps = {
  text: string;
};

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function MysticPill({ text }: MysticPillProps) {
  if (isReactNative) {
    // React Native version with dynamic imports
    const { View, Text } = require("react-native");
    
    return React.createElement(
      View,
      { className: "rounded-full border border-brand-secondary px-4 py-2" },
      React.createElement(Text, { className: "text-brand-secondary" }, text)
    );
  }

  // Web version using regular div and span
  return (
    <div className="rounded-full border border-brand-secondary px-4 py-2">
      <span className="text-brand-secondary">{text}</span>
    </div>
  );
}
