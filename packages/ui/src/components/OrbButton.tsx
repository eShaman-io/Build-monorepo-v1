import React from 'react'
import { Pressable, Text, PressableProps, ViewStyle, TextStyle } from 'react-native'

export interface OrbButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export function OrbButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  style,
  textStyle,
  ...props 
}: OrbButtonProps) {
  const baseButtonStyles: ViewStyle = {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  }

  const sizeStyles = {
    sm: { paddingHorizontal: 16, paddingVertical: 8 },
    md: { paddingHorizontal: 24, paddingVertical: 12 },
    lg: { paddingHorizontal: 32, paddingVertical: 16 },
  }

  const variantStyles = {
    primary: {
      backgroundColor: 'rgba(0, 212, 255, 0.8)',
    },
    secondary: {
      backgroundColor: 'rgba(143, 211, 255, 0.8)',
    },
    ghost: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    }
  }

  const baseTextStyles: TextStyle = {
    fontWeight: '600',
    textAlign: 'center',
  }

  const textVariantStyles = {
    primary: { color: '#0A0F1F' },
    secondary: { color: '#0A0F1F' },
    ghost: { color: '#DFE7FF' },
  }

  const textSizeStyles = {
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
  }

  return (
    <Pressable 
      style={({ pressed }) => [
        baseButtonStyles,
        sizeStyles[size],
        variantStyles[variant],
        pressed && { transform: [{ scale: 0.95 }] },
        style
      ]}
      className={`orb-button ${className}`}
      {...props}
    >
      <Text 
        style={[
          baseTextStyles,
          textSizeStyles[size],
          textVariantStyles[variant],
          textStyle
        ]}
      >
        {children}
      </Text>
    </Pressable>
  )
}
