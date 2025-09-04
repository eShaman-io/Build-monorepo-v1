import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Switch,
  Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

// Mock user data - replace with real data from Firebase/Auth
const mockUser = {
  name: "Sarah Chen",
  email: "sarah@example.com",
  joinDate: "December 2024",
  subscription: {
    plan: "Premium",
    status: "Active",
    renewsOn: "January 15, 2025",
    features: ["Unlimited Oracle conversations", "All rituals & meditations", "Lunar notifications", "Personalized insights"]
  },
  stats: {
    oracleChats: 47,
    ritualsCompleted: 23,
    daysActive: 12,
    currentStreak: 5
  }
}

const settingsOptions = [
  {
    section: "Notifications",
    items: [
      { key: "dailyCard", label: "Daily Card", description: "Receive your daily tarot card", enabled: true },
      { key: "lunarPhases", label: "Lunar Phases", description: "Moon cycle notifications", enabled: true },
      { key: "ritualReminders", label: "Ritual Reminders", description: "Gentle practice reminders", enabled: false },
      { key: "oracleInsights", label: "Oracle Insights", description: "Weekly wisdom summaries", enabled: true }
    ]
  },
  {
    section: "Privacy",
    items: [
      { key: "analytics", label: "Usage Analytics", description: "Help improve the app", enabled: true },
      { key: "personalization", label: "Personalized Content", description: "Tailored recommendations", enabled: true }
    ]
  }
]

export default function Profile() {
  const [settings, setSettings] = useState(() => {
    const initialSettings: Record<string, boolean> = {}
    settingsOptions.forEach(section => {
      section.items.forEach(item => {
        initialSettings[item.key] = item.enabled
      })
    })
    return initialSettings
  })

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubscriptionManage = () => {
    Alert.alert(
      "Manage Subscription",
      "This would open subscription management (RevenueCat/App Store)",
      [{ text: "OK" }]
    )
  }

  const handleDataExport = () => {
    Alert.alert(
      "Export Data",
      "Your data export will be prepared and sent to your email address.",
      [{ text: "Cancel", style: "cancel" }, { text: "Export", style: "default" }]
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0F1F' }}>
      {/* Header */}
      <BlurView intensity={20} style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={{ borderRadius: 16, padding: 16 }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(0, 212, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
              borderWidth: 2,
              borderColor: 'rgba(0, 212, 255, 0.4)'
            }}>
              <Text style={{ fontSize: 32 }}>✨</Text>
            </View>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '600', 
              color: '#DFE7FF',
              marginBottom: 4
            }}>
              {mockUser.name}
            </Text>
            <Text style={{ 
              color: 'rgba(223, 231, 255, 0.7)', 
              fontSize: 16,
              marginBottom: 8
            }}>
              {mockUser.email}
            </Text>
            <View style={{
              backgroundColor: 'rgba(0, 255, 163, 0.2)',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(0, 255, 163, 0.3)'
            }}>
              <Text style={{ 
                color: '#00FFA3', 
                fontSize: 12, 
                fontWeight: '600' 
              }}>
                {mockUser.subscription.plan} • {mockUser.subscription.status}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#DFE7FF',
            marginBottom: 16
          }}>
            Your Journey
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {[
              { label: 'Oracle Chats', value: mockUser.stats.oracleChats, icon: '🔮' },
              { label: 'Rituals', value: mockUser.stats.ritualsCompleted, icon: '🕯️' },
              { label: 'Days Active', value: mockUser.stats.daysActive, icon: '📅' },
              { label: 'Current Streak', value: mockUser.stats.currentStreak, icon: '🔥' }
            ].map((stat, index) => (
              <View key={stat.label} style={{ width: '48%' }}>
                <BlurView 
                  intensity={10}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <View style={{ padding: 16, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</Text>
                    <Text style={{ 
                      fontSize: 20, 
                      fontWeight: '600', 
                      color: '#DFE7FF',
                      marginBottom: 2
                    }}>
                      {stat.value}
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      color: 'rgba(223, 231, 255, 0.6)',
                      textAlign: 'center'
                    }}>
                      {stat.label}
                    </Text>
                  </View>
                </BlurView>
              </View>
            ))}
          </View>
        </View>

        {/* Subscription */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#DFE7FF',
            marginBottom: 16
          }}>
            Subscription
          </Text>
          
          <BlurView 
            intensity={15}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <LinearGradient
              colors={['rgba(0, 255, 163, 0.1)', 'rgba(0, 255, 163, 0.05)']}
              style={{ padding: 20 }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: '600', 
                    color: '#DFE7FF',
                    marginBottom: 4
                  }}>
                    {mockUser.subscription.plan} Plan
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    color: 'rgba(223, 231, 255, 0.7)' 
                  }}>
                    Renews on {mockUser.subscription.renewsOn}
                  </Text>
                </View>
                <Pressable
                  onPress={handleSubscriptionManage}
                  style={({ pressed }) => ({
                    backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    transform: [{ scale: pressed ? 0.95 : 1 }]
                  })}
                >
                  <Text style={{ 
                    color: '#00D4FF', 
                    fontSize: 14, 
                    fontWeight: '600' 
                  }}>
                    Manage
                  </Text>
                </Pressable>
              </View>
              
              <Text style={{ 
                fontSize: 14, 
                color: 'rgba(223, 231, 255, 0.8)',
                marginBottom: 12
              }}>
                Included features:
              </Text>
              
              {mockUser.subscription.features.map((feature, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <Text style={{ color: '#00FFA3', marginRight: 8 }}>✓</Text>
                  <Text style={{ 
                    color: 'rgba(223, 231, 255, 0.8)', 
                    fontSize: 14 
                  }}>
                    {feature}
                  </Text>
                </View>
              ))}
            </LinearGradient>
          </BlurView>
        </View>

        {/* Settings */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={section.section} style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#DFE7FF',
              marginBottom: 16
            }}>
              {section.section}
            </Text>
            
            <BlurView 
              intensity={10}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {section.items.map((item, index) => (
                <View key={item.key}>
                  <View style={{ 
                    padding: 16, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <View style={{ flex: 1, marginRight: 16 }}>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: '500', 
                        color: '#DFE7FF',
                        marginBottom: 2
                      }}>
                        {item.label}
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: 'rgba(223, 231, 255, 0.6)' 
                      }}>
                        {item.description}
                      </Text>
                    </View>
                    <Switch
                      value={settings[item.key]}
                      onValueChange={() => toggleSetting(item.key)}
                      trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(0, 212, 255, 0.3)' }}
                      thumbColor={settings[item.key] ? '#00D4FF' : 'rgba(255, 255, 255, 0.6)'}
                    />
                  </View>
                  {index < section.items.length - 1 && (
                    <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', marginHorizontal: 16 }} />
                  )}
                </View>
              ))}
            </BlurView>
          </View>
        ))}

        {/* Account Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#DFE7FF',
            marginBottom: 16
          }}>
            Account
          </Text>
          
          <Pressable
            onPress={handleDataExport}
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
              marginBottom: 12
            })}
          >
            <BlurView 
              intensity={10}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>📤</Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: '#DFE7FF',
                  flex: 1
                }}>
                  Export My Data
                </Text>
                <Text style={{ color: 'rgba(223, 231, 255, 0.5)' }}>→</Text>
              </View>
            </BlurView>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
