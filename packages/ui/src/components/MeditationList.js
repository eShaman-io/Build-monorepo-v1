"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeditationList = MeditationList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
const GlassCard_1 = require("./GlassCard");
const OrbButton_1 = require("./OrbButton");
function MeditationList() {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [meditations, setMeditations] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const db = (0, firebase_client_1.getFirebaseDb)();
        const meditationsRef = (0, firestore_1.collection)(db, "meditations");
        const q = (0, firestore_1.query)(meditationsRef);
        const unsubscribe = (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const allMeditations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMeditations(allMeditations);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching meditations:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading meditations..." });
    }
    if (!user) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Please log in to listen to meditations." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-center text-4xl font-bold", children: "Guided Meditations" }), meditations.map((meditation) => ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-bold", children: meditation.title }), (0, jsx_runtime_1.jsx)("p", { className: "mb-4 text-brand-neutral-dark", children: meditation.description }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: () => alert(`Playing: ${meditation.title}`), title: `Play (${Math.floor(meditation.duration / 60)} min)` })] }, meditation.id)))] }));
}
