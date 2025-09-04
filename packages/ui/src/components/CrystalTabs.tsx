import React, { useState } from 'react'
import { View, Pressable, Text, ViewStyle, TextStyle } from 'react-native'

export interface CrystalTab {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface CrystalTabsProps {
  tabs: CrystalTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
  style?: ViewStyle
}

export function CrystalTabs({ 
  tabs, 
  activeTab, 
  onTabChange,
  className = '',
  style
}: CrystalTabsProps) {
  const containerStyles: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  }

  const tabStyles: ViewStyle = {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const activeTabStyles: ViewStyle = {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  }

  const tabTextStyles: TextStyle = {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(223, 231, 255, 0.7)',
  }

  const activeTabTextStyles: TextStyle = {
    color: '#00D4FF',
    fontWeight: '600',
  }

  return (
    <View style={[containerStyles, style]} className={`crystal-tabs ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        
        return (
          <Pressable
            key={tab.id}
            style={({ pressed }) => [
              tabStyles,
              isActive && activeTabStyles,
              pressed && { transform: [{ scale: 0.95 }] }
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            {tab.icon && (
              <View style={{ marginBottom: 2 }}>
                {tab.icon}
              </View>
            )}
            <Text style={[tabTextStyles, isActive && activeTabTextStyles]}>
              {tab.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
