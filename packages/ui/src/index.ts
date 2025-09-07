// Export web-compatible UI components only
// Components that use React Native APIs are excluded from web builds
export { OrbButton } from './components/OrbButton'
export { AuthProvider, useAuth } from './components/AuthProvider'
export { Login } from './components/Login'
export { Waitlist } from './components/Waitlist'
export { Signup } from './components/Signup'

// Note: The following components use React Native and are not compatible with web builds:
// - GlassCard (uses react-native View, expo-blur)
// - OrbButton (uses react-native Pressable, Text) 
// - MysticPill (uses react-native components)
// - CrystalTabs (uses react-native components)
// - ChatBubble (uses react-native components)
// - OracleChat (uses react-native components)
// - Profile (uses react-native components)
// - NotificationsSettings (uses react-native, expo-notifications)
// - Pricing (uses react-i18next, react-native components)
// - RitualCreator (uses react-native components)
// - RitualList (uses react-native components)  
// - JournalEditor (uses react-native components)
// - JournalFeed (uses react-native components)
// - ForumThreadCreator (uses react-native components)
// - ForumThreadList (uses react-native components)
// - MeditationList (uses react-native components)
// - PurchasesAuthProvider (React Native only)
// - MobilePricing (React Native only)

// For mobile apps, import components directly:
// import { ComponentName } from '@esh/ui/src/components/ComponentName'
