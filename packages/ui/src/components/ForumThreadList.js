"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumThreadList = ForumThreadList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
const GlassCard_1 = require("./GlassCard");
function ForumThreadList() {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [threads, setThreads] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const db = (0, firebase_client_1.getFirebaseDb)();
        const threadsRef = (0, firestore_1.collection)(db, "forumThreads");
        const q = (0, firestore_1.query)(threadsRef, (0, firestore_1.orderBy)("lastReplyAt", "desc"));
        const unsubscribe = (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const allThreads = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setThreads(allThreads);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading discussions..." });
    }
    if (!user) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Please log in to view the forum." });
    }
    if (threads.length === 0) {
        return (0, jsx_runtime_1.jsx)("p", { children: "No discussions have been started yet." });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: threads.map((thread) => ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold", children: thread.title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-brand-neutral-dark", children: ["Posted by ", thread.userName, " in ", thread.category] })] }, thread.id))) }));
}
