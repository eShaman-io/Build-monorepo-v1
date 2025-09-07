import React from "react";

type OrbButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export function OrbButton({ onPress, title, disabled = false }: OrbButtonProps) {
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
