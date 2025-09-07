import React from "react";

export interface ChatBubbleProps {
  message: string;
  role: "user" | "assistant";
  timestamp?: Date;
  className?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function ChatBubble({
  message,
  role,
  timestamp,
  className = "",
  style,
  textStyle,
}: ChatBubbleProps) {
  const isUser = role === "user";

  if (isReactNative) {
    // React Native version with dynamic imports
    const { View, Text } = require("react-native");
    
    const containerStyles = {
      alignSelf: isUser ? ("flex-end" as const) : ("flex-start" as const),
      maxWidth: "80%",
      marginVertical: 4,
    };

    const bubbleStyles = {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      borderWidth: 1,
    };

    const userBubbleStyles = {
      backgroundColor: "rgba(0, 212, 255, 0.9)",
      borderColor: "rgba(0, 212, 255, 0.3)",
      borderTopRightRadius: 8,
    };

    const assistantBubbleStyles = {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderColor: "rgba(255, 255, 255, 0.16)",
      borderTopLeftRadius: 8,
    };

    const textStyles = {
      fontSize: 16,
      lineHeight: 22,
    };

    const userTextStyles = {
      color: "#0A0F1F",
    };

    const assistantTextStyles = {
      color: "#DFE7FF",
    };

    const timestampStyles = {
      fontSize: 12,
      marginTop: 4,
      opacity: 0.6,
    };

    return React.createElement(
      View,
      {
        style: [containerStyles, style],
        className: `chat-bubble ${role} ${className}`
      },
      React.createElement(
        View,
        {
          style: [
            bubbleStyles,
            isUser ? userBubbleStyles : assistantBubbleStyles,
          ]
        },
        React.createElement(
          Text,
          {
            style: [
              textStyles,
              isUser ? userTextStyles : assistantTextStyles,
              textStyle,
            ]
          },
          message
        ),
        timestamp && React.createElement(
          Text,
          {
            style: [
              timestampStyles,
              isUser ? userTextStyles : assistantTextStyles,
            ]
          },
          timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        )
      )
    );
  }

  // Web version using regular div and span elements
  return (
    <div
      className={`chat-bubble ${role} ${className} ${isUser ? 'self-end' : 'self-start'} max-w-[80%] my-1`}
      style={style}
    >
      <div
        className={`px-4 py-3 rounded-3xl border ${
          isUser
            ? "bg-blue-500/90 border-blue-400/30 rounded-tr-lg text-slate-900"
            : "bg-white/8 border-white/16 rounded-tl-lg text-slate-100"
        }`}
      >
        <p
          className="text-base leading-relaxed"
          style={textStyle}
        >
          {message}
        </p>
        {timestamp && (
          <p className="text-xs mt-1 opacity-60">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
