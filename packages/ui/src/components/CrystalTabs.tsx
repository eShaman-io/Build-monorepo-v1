import React from "react";

export interface CrystalTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CrystalTabsProps {
  tabs: CrystalTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function CrystalTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  style,
}: CrystalTabsProps) {
  if (isReactNative) {
    // React Native version with dynamic imports
    const { View, Pressable, Text } = require("react-native");
    
    const containerStyles = {
      flexDirection: "row" as const,
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      borderRadius: 16,
      padding: 4,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
    };

    const tabStyles = {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    const activeTabStyles = {
      backgroundColor: "rgba(0, 212, 255, 0.2)",
      borderWidth: 1,
      borderColor: "rgba(0, 212, 255, 0.3)",
    };

    const tabTextStyles = {
      fontSize: 14,
      fontWeight: "500" as const,
      color: "rgba(223, 231, 255, 0.7)",
    };

    const activeTabTextStyles = {
      color: "#00D4FF",
      fontWeight: "600" as const,
    };

    return React.createElement(
      View,
      {
        style: [containerStyles, style],
        className: `crystal-tabs ${className}`
      },
      tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return React.createElement(
          Pressable,
          {
            key: tab.id,
            style: ({ pressed }: any) => [
              tabStyles,
              isActive && activeTabStyles,
              pressed && { transform: [{ scale: 0.95 }] },
            ],
            onPress: () => onTabChange(tab.id)
          },
          tab.icon && React.createElement(View, { style: { marginBottom: 2 } }, tab.icon),
          React.createElement(Text, { style: [tabTextStyles, isActive && activeTabTextStyles] }, tab.label)
        );
      })
    );
  }

  // Web version using regular div and button elements
  return (
    <div
      className={`crystal-tabs flex bg-white/5 rounded-2xl p-1 border border-white/10 ${className}`}
      style={style}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            className={`flex-1 px-4 py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-blue-500/20 border border-blue-400/30 text-blue-400 font-semibold"
                : "text-slate-300 hover:text-slate-200 hover:bg-white/5"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <div className="mb-1">{tab.icon}</div>}
            <span className="text-sm">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
