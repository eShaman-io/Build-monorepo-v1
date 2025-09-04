import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'

export interface ChatBubbleProps {
  message: string
  role: 'user' | 'assistant'
  timestamp?: Date
  className?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export function ChatBubble({ 
  message, 
  role,
  timestamp,
  className = '',
  style,
  textStyle
}: ChatBubbleProps) {
  const isUser = role === 'user'
  
  const containerStyles: ViewStyle = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    maxWidth: '80%',
    marginVertical: 4,
  }

  const bubbleStyles: ViewStyle = {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
  }

  const userBubbleStyles: ViewStyle = {
    backgroundColor: 'rgba(0, 212, 255, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    borderTopRightRadius: 8,
  }

  const assistantBubbleStyles: ViewStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderTopLeftRadius: 8,
  }

  const textStyles: TextStyle = {
    fontSize: 16,
    lineHeight: 22,
  }

  const userTextStyles: TextStyle = {
    color: '#0A0F1F',
  }

  const assistantTextStyles: TextStyle = {
    color: '#DFE7FF',
  }

  const timestampStyles: TextStyle = {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
  }

  return (
    <View style={[containerStyles, style]} className={`chat-bubble ${role} ${className}`}>
      <View style={[
        bubbleStyles,
        isUser ? userBubbleStyles : assistantBubbleStyles
      ]}>
        <Text style={[
          textStyles,
          isUser ? userTextStyles : assistantTextStyles,
          textStyle
        ]}>
          {message}
        </Text>
        {timestamp && (
          <Text style={[
            timestampStyles,
            isUser ? userTextStyles : assistantTextStyles
          ]}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </View>
    </View>
  )
}
