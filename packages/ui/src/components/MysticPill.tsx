import React from 'react'
import { Pressable, Text, PressableProps, ViewStyle, TextStyle } from 'react-native'

export interface MysticPillProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode
  active?: boolean
  className?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export function MysticPill({ 
  children, 
  active = false,
  className = '',
  style,
  textStyle,
  ...props 
}: MysticPillProps) {
  const baseStyles: ViewStyle = {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
  }

  const activeStyles: ViewStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.24)',
  }

  const baseTextStyles: TextStyle = {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(223, 231, 255, 0.9)',
  }

  const activeTextStyles: TextStyle = {
    color: '#DFE7FF',
  }

  return (
    <Pressable 
      style={({ pressed }) => [
        baseStyles,
        active && activeStyles,
        pressed && { transform: [{ scale: 0.95 }] },
        style
      ]}
      className={`mystic-pill ${active ? 'active' : ''} ${className}`}
      {...props}
    >
      <Text 
        style={[
          baseTextStyles,
          active && activeTextStyles,
          textStyle
        ]}
      >
        {children}
      </Text>
    </Pressable>
  )
}
