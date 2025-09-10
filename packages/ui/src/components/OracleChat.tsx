"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "@eshamanio/firebase-client";
import { ChatBubble } from "./ChatBubble";
import { OrbButton } from "./OrbButton";
import type { ChatMessage } from "@eshamanio/schemas";

// In a real app, the chatId would be dynamic (e.g., from the URL or user's session)
const CHAT_ID = "_test_chat_session_";

export function OracleChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const db = getFirebaseDb();
    const messagesRef = collection(db, "chats", CHAT_ID, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data() as ChatMessage);
      setMessages(msgs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the bottom on new messages
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    const db = getFirebaseDb();
    const messagesRef = collection(db, "chats", CHAT_ID, "messages");

    await addDoc(messagesRef, {
      role: "user",
      content: inputText,
      timestamp: serverTimestamp(),
    });

    setInputText("");
  };

  return (
    <div className="flex h-[70vh] w-full max-w-2xl flex-col rounded-lg bg-brand-primary-light p-4 shadow-lg">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.content} role={msg.role} timestamp={msg.timestamp} />
        ))}
        {isLoading && (
          <div className="self-start rounded-lg bg-brand-primary p-3">
            <p className="animate-pulse text-brand-neutral-dark">
              The oracle is typing...
            </p>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="mt-4 flex items-center space-x-2"
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask the oracle..."
          className="flex-1 rounded-lg bg-brand-primary p-4 text-white"
        />
        <OrbButton onPress={handleSendMessage} title="Send" disabled={isLoading} />
      </form>
    </div>
  );
}
