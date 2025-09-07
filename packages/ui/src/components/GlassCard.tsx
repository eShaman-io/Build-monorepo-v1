import React from "react";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function GlassCard({ children, className }: GlassCardProps) {
  if (isReactNative) {
    // React Native version with dynamic imports
    const { View } = require("react-native");
    const { BlurView } = require("expo-blur");
    
    return React.createElement(
      BlurView,
      {
        intensity: 20,
        tint: "dark",
        style: {
          borderRadius: 16,
          overflow: "hidden",
        },
      },
      React.createElement(View, { className: `p-4 ${className}` }, children)
    );
  }

  // Web version using regular div with glass effect styles
  return (
    <div
      className={`backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 ${className}`}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}
