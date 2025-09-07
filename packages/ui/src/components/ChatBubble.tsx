import React from "react";

export interface ChatBubbleProps {
  message: string;
  role: "user" | "assistant";
  timestamp?: Date;
  className?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export function ChatBubble({
  message,
  role,
  timestamp,
  className = "",
  style,
  textStyle,
}: ChatBubbleProps) {
  const isUser = role === "user";

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
