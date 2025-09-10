"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitlistForm = WaitlistForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const OrbButton_1 = require("./OrbButton");
function WaitlistForm() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                throw new Error("Something went wrong. Please try again.");
            }
            const data = await res.json();
            setMessage(data.message);
            setEmail("");
        }
        catch (err) {
            setError(err.message);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "flex w-full max-w-md flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), className: "rounded-lg bg-brand-primary-light p-4 text-white", required: true }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: () => { }, title: "Join the Waitlist" }), message && (0, jsx_runtime_1.jsx)("p", { className: "text-green-500", children: message }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: error })] }));
}
