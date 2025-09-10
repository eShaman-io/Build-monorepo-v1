"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleChat = OracleChat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_client_1 = require("@eshamanio/firebase-client");
const ChatBubble_1 = require("./ChatBubble");
const OrbButton_1 = require("./OrbButton");
// In a real app, the chatId would be dynamic (e.g., from the URL or user's session)
const CHAT_ID = "_test_chat_session_";
function OracleChat() {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [inputText, setInputText] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const scrollRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const db = (0, firebase_client_1.getFirebaseDb)();
        const messagesRef = (0, firestore_1.collection)(db, "chats", CHAT_ID, "messages");
        const q = (0, firestore_1.query)(messagesRef, (0, firestore_1.orderBy)("timestamp"));
        const unsubscribe = (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => doc.data());
            setMessages(msgs);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    (0, react_1.useEffect)(() => {
        // Scroll to the bottom on new messages
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);
    const handleSendMessage = async () => {
        if (!inputText.trim())
            return;
        setIsLoading(true);
        const db = (0, firebase_client_1.getFirebaseDb)();
        const messagesRef = (0, firestore_1.collection)(db, "chats", CHAT_ID, "messages");
        await (0, firestore_1.addDoc)(messagesRef, {
            role: "user",
            content: inputText,
            timestamp: (0, firestore_1.serverTimestamp)(),
        });
        setInputText("");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-[70vh] w-full max-w-2xl flex-col rounded-lg bg-brand-primary-light p-4 shadow-lg", children: [(0, jsx_runtime_1.jsxs)("div", { ref: scrollRef, className: "flex-1 space-y-4 overflow-y-auto p-2", children: [messages.map((msg, index) => ((0, jsx_runtime_1.jsx)(ChatBubble_1.ChatBubble, { message: msg.content, role: msg.role, timestamp: msg.timestamp }, index))), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "self-start rounded-lg bg-brand-primary p-3", children: (0, jsx_runtime_1.jsx)("p", { className: "animate-pulse text-brand-neutral-dark", children: "The oracle is typing..." }) }))] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSendMessage, className: "mt-4 flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { value: inputText, onChange: (e) => setInputText(e.target.value), placeholder: "Ask the oracle...", className: "flex-1 rounded-lg bg-brand-primary p-4 text-white" }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSendMessage, title: "Send", disabled: isLoading })] })] }));
}
