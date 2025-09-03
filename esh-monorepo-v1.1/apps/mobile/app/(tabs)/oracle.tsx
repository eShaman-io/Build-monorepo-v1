import { View, Text, TextInput, Pressable, FlatList } from "react-native"
import { useState } from "react"

type Msg = { id: string, role: "user" | "assistant", content: string }

export default function Oracle() {
  const [messages, setMessages] = useState<Msg[]>([{ id: "1", role: "assistant", content: "Welcome. What do you seek?" }])
  const [input, setInput] = useState("")

  const send = () => {
    if (!input.trim()) return
    const user: Msg = { id: Math.random().toString(36).slice(2), role: "user", content: input.trim() }
    setMessages(prev => [user, ...prev])
    setTimeout(() => {
      setMessages(prev => [{ id: Math.random().toString(36).slice(2), role: "assistant", content: "✨ A calm begins where attention rests." }, ...prev])
    }, 500)
    setInput("")
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0F1F" }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        inverted
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%", marginVertical: 6 }}>
            <Text style={{
              color: item.role === "user" ? "#001014" : "white",
              backgroundColor: item.role === "user" ? "rgba(0,212,255,0.9)" : "rgba(255,255,255,0.08)",
              borderWidth: 1, borderColor: "rgba(255,255,255,0.16)",
              paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16
            }}>{item.content}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", gap: 8, padding: 12, borderTopWidth: 1, borderColor: "rgba(255,255,255,0.12)" }}>
        <TextInput
          value={input} onChangeText={setInput} placeholder="Ask the Oracle…"
          placeholderTextColor="rgba(255,255,255,0.5)"
          style={{ flex: 1, color: "white", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10 }}
        />
        <Pressable onPress={send} style={{ backgroundColor: "rgba(0,212,255,0.85)", paddingHorizontal: 16, borderRadius: 16, justifyContent: "center" }}>
          <Text style={{ color: "#001014", fontWeight: "700" }}>Send</Text>
        </Pressable>
      </View>
    </View>
  )
}
