import React from 'react';

type OrbButtonProps = {
  onPress: () => void;
  title: string;
};

export function OrbButton({ onPress, title }: OrbButtonProps) {
  return (
    <button 
      onClick={onPress} 
      className="rounded-full bg-brand-secondary p-4 text-center text-lg font-bold text-white"
    >
      {title}
    </button>
  );
}
