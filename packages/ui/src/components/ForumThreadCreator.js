"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumThreadCreator = ForumThreadCreator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("@eshamanio/schemas");
const OrbButton_1 = require("./OrbButton");
const GlassCard_1 = require("./GlassCard");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
const firestore_1 = require("firebase/firestore");
function ForumThreadCreator({ onThreadCreated, }) {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [formStatus, setFormStatus] = (0, react_1.useState)("idle");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const { register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.ForumThreadSchema.omit({
            userId: true,
            userName: true,
            createdAt: true,
            lastReplyAt: true,
        })),
    });
    const onSubmit = async (data) => {
        if (!user || !user.displayName) {
            setErrorMessage("You must be logged in and have a display name to create a thread.");
            return;
        }
        setFormStatus("loading");
        setErrorMessage(null);
        try {
            const db = (0, firebase_client_1.getFirebaseDb)();
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "forumThreads"), {
                ...data,
                userId: user.uid,
                userName: user.displayName,
                createdAt: (0, firestore_1.serverTimestamp)(),
                lastReplyAt: (0, firestore_1.serverTimestamp)(),
            });
            reset();
            onThreadCreated();
        }
        catch (error) {
            setFormStatus("error");
            setErrorMessage(error.message);
        }
        finally {
            setFormStatus("idle");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-2xl font-bold", children: "Start a New Discussion" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { ...register("title"), placeholder: "Thread Title", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.title && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.title.message })), (0, jsx_runtime_1.jsxs)("select", { ...register("category"), className: "rounded-lg bg-brand-primary-light p-4 text-white", children: [(0, jsx_runtime_1.jsx)("option", { children: "General" }), (0, jsx_runtime_1.jsx)("option", { children: "Rituals" }), (0, jsx_runtime_1.jsx)("option", { children: "Astrology" }), (0, jsx_runtime_1.jsx)("option", { children: "Meditations" })] }), errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errorMessage }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSubmit(onSubmit), title: formStatus === "loading" ? "Posting..." : "Post Thread", disabled: formStatus === "loading" })] })] }));
}
