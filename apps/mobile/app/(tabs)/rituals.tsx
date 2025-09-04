import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Dimensions,
  Modal
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const { width } = Dimensions.get('window')

const rituals = [
  {
    id: 'morning-clarity',
    title: 'Morning Clarity',
    subtitle: 'Start your day with intention',
    duration: '5 min',
    difficulty: 'Beginner',
    icon: '🌅',
    color: '#FFD58A',
    description: 'A gentle morning practice to set clear intentions and align with your highest purpose.',
    steps: [
      'Find a comfortable seated position',
      'Take three deep breaths',
      'Set your intention for the day',
      'Visualize your goals manifesting',
      'Express gratitude for new beginnings'
    ]
  },
  {
    id: 'lunar-meditation',
    title: 'Lunar Meditation',
    subtitle: 'Connect with moon energy',
    duration: '15 min',
    difficulty: 'Intermediate',
    icon: '🌙',
    color: '#8FD3FF',
    description: 'Harness the power of lunar cycles for deep introspection and emotional healing.',
    steps: [
      'Create a sacred space',
      'Light a candle or incense',
      'Gaze at the moon (or visualize it)',
      'Breathe with lunar rhythm',
      'Release what no longer serves',
      'Absorb lunar wisdom and intuition'
    ]
  },
  {
    id: 'energy-cleansing',
    title: 'Energy Cleansing',
    subtitle: 'Clear negative vibrations',
    duration: '8 min',
    difficulty: 'Beginner',
    icon: '🕯️',
    color: '#00FFA3',
    description: 'Purify your energy field and create space for positive transformation.',
    steps: [
      'Stand with feet hip-width apart',
      'Visualize white light surrounding you',
      'Sweep negative energy away with your hands',
      'Breathe in pure, clean energy',
      'Seal your aura with protection'
    ]
  }
]

const categories = [
  { name: 'All', count: rituals.length },
  { name: 'Morning', count: 1 },
  { name: 'Evening', count: 1 },
  { name: 'Healing', count: 1 }
]

export default function Rituals() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRitual, setSelectedRitual] = useState<typeof rituals[0] | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openRitual = (ritual: typeof rituals[0]) => {
    setSelectedRitual(ritual)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setSelectedRitual(null)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0F1F' }}>
      {/* Header */}
      <BlurView intensity={20} style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={{ borderRadius: 16, padding: 16 }}
        >
          <Text style={{ 
            fontSize: 28, 
            fontWeight: '600', 
            color: '#DFE7FF',
            textAlign: 'center',
            marginBottom: 4
          }}>
            Sacred Rituals
          </Text>
          <Text style={{ 
            textAlign: 'center', 
            color: 'rgba(223, 231, 255, 0.7)', 
            fontSize: 16
          }}>
            Transform through ancient practices
          </Text>
        </LinearGradient>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {categories.map((category) => (
                <Pressable
                  key={category.name}
                  onPress={() => setSelectedCategory(category.name)}
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.95 : 1 }]
                  })}
                >
                  <BlurView 
                    intensity={selectedCategory === category.name ? 20 : 10}
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: selectedCategory === category.name 
                        ? 'rgba(0, 212, 255, 0.4)' 
                        : 'rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <LinearGradient
                      colors={selectedCategory === category.name
                        ? ['rgba(0, 212, 255, 0.2)', 'rgba(0, 212, 255, 0.1)']
                        : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']
                      }
                      style={{ paddingHorizontal: 16, paddingVertical: 8 }}
                    >
                      <Text style={{ 
                        color: selectedCategory === category.name ? '#DFE7FF' : 'rgba(223, 231, 255, 0.7)',
                        fontWeight: selectedCategory === category.name ? '600' : '400',
                        fontSize: 14
                      }}>
                        {category.name} ({category.count})
                      </Text>
                    </LinearGradient>
                  </BlurView>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Rituals Grid */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {rituals.map((ritual, index) => (
            <Pressable
              key={ritual.id}
              onPress={() => openRitual(ritual)}
              style={({ pressed }) => ({
                marginBottom: 16,
                transform: [{ scale: pressed ? 0.98 : 1 }]
              })}
            >
              <BlurView 
                intensity={15}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
              >
                <LinearGradient
                  colors={[`${ritual.color}20`, `${ritual.color}10`]}
                  style={{ padding: 20 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{ fontSize: 32, marginRight: 12 }}>{ritual.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ 
                        fontSize: 18, 
                        fontWeight: '600', 
                        color: '#DFE7FF',
                        marginBottom: 2
                      }}>
                        {ritual.title}
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: 'rgba(223, 231, 255, 0.7)' 
                      }}>
                        {ritual.subtitle}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={{ 
                    fontSize: 14, 
                    color: 'rgba(223, 231, 255, 0.8)',
                    lineHeight: 20,
                    marginBottom: 16
                  }}>
                    {ritual.description}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <Text style={{ fontSize: 12, color: 'rgba(223, 231, 255, 0.6)' }}>⏱️ {ritual.duration}</Text>
                      <Text style={{ fontSize: 12, color: 'rgba(223, 231, 255, 0.6)' }}>📊 {ritual.difficulty}</Text>
                    </View>
                    
                    <View style={{
                      backgroundColor: 'rgba(0, 212, 255, 0.2)',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 212, 255, 0.3)'
                    }}>
                      <Text style={{ 
                        color: '#00D4FF', 
                        fontSize: 12, 
                        fontWeight: '600' 
                      }}>
                        Begin
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </BlurView>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Ritual Detail Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        {selectedRitual && (
          <View style={{ flex: 1, backgroundColor: '#0A0F1F' }}>
            <BlurView intensity={20} style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Pressable onPress={closeModal}>
                  <Text style={{ color: '#00D4FF', fontSize: 16 }}>Close</Text>
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#DFE7FF' }}>
                  {selectedRitual.title}
                </Text>
                <View style={{ width: 50 }} />
              </View>
            </BlurView>

            <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
              <BlurView 
                intensity={15}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  marginBottom: 24
                }}
              >
                <LinearGradient
                  colors={[`${selectedRitual.color}20`, `${selectedRitual.color}10`]}
                  style={{ padding: 24, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 48, marginBottom: 16 }}>{selectedRitual.icon}</Text>
                  <Text style={{ 
                    fontSize: 24, 
                    fontWeight: '600', 
                    color: '#DFE7FF',
                    textAlign: 'center',
                    marginBottom: 8
                  }}>
                    {selectedRitual.title}
                  </Text>
                  <Text style={{ 
                    fontSize: 16, 
                    color: 'rgba(223, 231, 255, 0.7)',
                    textAlign: 'center',
                    marginBottom: 16
                  }}>
                    {selectedRitual.description}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', gap: 24 }}>
                    <Text style={{ color: 'rgba(223, 231, 255, 0.8)', fontSize: 14 }}>
                      ⏱️ {selectedRitual.duration}
                    </Text>
                    <Text style={{ color: 'rgba(223, 231, 255, 0.8)', fontSize: 14 }}>
                      📊 {selectedRitual.difficulty}
                    </Text>
                  </View>
                </LinearGradient>
              </BlurView>

              <Text style={{ 
                fontSize: 20, 
                fontWeight: '600', 
                color: '#DFE7FF',
                marginBottom: 16
              }}>
                Ritual Steps
              </Text>

              {selectedRitual.steps.map((step, index) => (
                <BlurView 
                  key={index}
                  intensity={10}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    marginBottom: 12
                  }}
                >
                  <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(0, 212, 255, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16
                    }}>
                      <Text style={{ color: '#00D4FF', fontWeight: '600' }}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text style={{ 
                      flex: 1,
                      color: 'rgba(223, 231, 255, 0.8)',
                      fontSize: 16,
                      lineHeight: 22
                    }}>
                      {step}
                    </Text>
                  </View>
                </BlurView>
              ))}

              <Pressable
                style={({ pressed }) => ({
                  marginTop: 24,
                  marginBottom: 40,
                  transform: [{ scale: pressed ? 0.98 : 1 }]
                })}
              >
                <BlurView 
                  intensity={20}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 212, 255, 0.4)'
                  }}
                >
                  <LinearGradient
                    colors={['rgba(0, 212, 255, 0.3)', 'rgba(0, 212, 255, 0.2)']}
                    style={{ padding: 16, alignItems: 'center' }}
                  >
                    <Text style={{ 
                      color: '#DFE7FF', 
                      fontSize: 18, 
                      fontWeight: '600' 
                    }}>
                      Start Ritual
                    </Text>
                  </LinearGradient>
                </BlurView>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  )
}
