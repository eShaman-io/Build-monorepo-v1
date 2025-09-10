"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEditor = JournalEditor;
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
function JournalEditor({ onEntrySaved }) {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [formStatus, setFormStatus] = (0, react_1.useState)("idle");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const { register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.JournalEntrySchema.omit({
            userId: true,
            createdAt: true,
            updatedAt: true,
        })),
    });
    const onSubmit = async (data) => {
        if (!user) {
            setErrorMessage("You must be logged in to save an entry.");
            return;
        }
        setFormStatus("loading");
        setErrorMessage(null);
        try {
            const db = (0, firebase_client_1.getFirebaseDb)();
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "journalEntries"), {
                ...data,
                userId: user.uid,
                createdAt: (0, firestore_1.serverTimestamp)(),
                updatedAt: (0, firestore_1.serverTimestamp)(),
            });
            reset();
            onEntrySaved();
        }
        catch (error) {
            setFormStatus("error");
            setErrorMessage(error.message);
        }
        finally {
            setFormStatus("idle");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-2xl font-bold", children: "New Journal Entry" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { ...register("title"), placeholder: "Entry Title", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.title && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.title.message })), (0, jsx_runtime_1.jsx)("textarea", { ...register("content"), placeholder: "Write your thoughts...", rows: 5, className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.content && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.content.message })), errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errorMessage }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSubmit(onSubmit), title: formStatus === "loading" ? "Saving..." : "Save Entry", disabled: formStatus === "loading" })] })] }));
}
