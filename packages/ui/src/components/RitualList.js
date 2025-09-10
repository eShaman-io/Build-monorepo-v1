"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualList = RitualList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
const GlassCard_1 = require("./GlassCard");
function RitualList() {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [rituals, setRituals] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const db = (0, firebase_client_1.getFirebaseDb)();
        const ritualsRef = (0, firestore_1.collection)(db, "rituals");
        const q = (0, firestore_1.query)(ritualsRef, (0, firestore_1.where)("userId", "==", user.uid));
        const unsubscribe = (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const userRituals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRituals(userRituals);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading rituals..." });
    }
    if (!user) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Please log in to see your rituals." });
    }
    if (rituals.length === 0) {
        return (0, jsx_runtime_1.jsx)("p", { children: "You haven't created any rituals yet." });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: rituals.map((ritual) => ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold", children: ritual.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-brand-neutral-dark", children: ritual.description })] }, ritual.id))) }));
}
