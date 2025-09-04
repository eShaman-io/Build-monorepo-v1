import React from 'react'
import { View, ViewProps } from 'react-native'

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode
  variant?: 'default' | 'hover' | 'active'
  className?: string
}

export function GlassCard({ 
  children, 
  variant = 'default', 
  className = '',
  style,
  ...props 
}: GlassCardProps) {
  const baseStyles = {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  }

  const variantStyles = {
    default: {},
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderColor: 'rgba(255, 255, 255, 0.20)',
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.14)',
      borderColor: 'rgba(255, 255, 255, 0.24)',
    }
  }

  return (
    <View 
      style={[baseStyles, variantStyles[variant], style]}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}
