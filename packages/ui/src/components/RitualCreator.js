"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualCreator = RitualCreator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("@eshamanio/schemas");
const OrbButton_1 = require("./OrbButton");
const GlassCard_1 = require("./GlassCard");
const firebase_client_1 = require("@eshamanio/firebase-client");
function RitualCreator({ onRitualCreated }) {
    const [formStatus, setFormStatus] = (0, react_1.useState)("idle");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const { register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.RitualSchema.omit({ userId: true, createdAt: true })),
    });
    const onSubmit = async (data) => {
        setFormStatus("loading");
        setErrorMessage(null);
        try {
            const functions = (0, firebase_client_1.getFirebaseFunctions)();
            const createRitual = (0, firebase_client_1.httpsCallable)(functions, "createRitual");
            await createRitual(data);
            setFormStatus("success");
            reset();
            onRitualCreated();
        }
        catch (error) {
            setFormStatus("error");
            setErrorMessage(error.message);
        }
        finally {
            setFormStatus("idle");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-2xl font-bold", children: "Create a New Ritual" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { ...register("name"), placeholder: "Ritual Name (e.g., Morning Meditation)", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.name.message })), (0, jsx_runtime_1.jsx)("textarea", { ...register("description"), placeholder: "Description (optional)", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errorMessage }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSubmit(onSubmit), title: formStatus === "loading" ? "Creating..." : "Create Ritual", disabled: formStatus === "loading" })] })] }));
}
