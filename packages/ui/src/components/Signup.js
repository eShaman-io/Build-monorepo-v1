"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = Signup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("@eshamanio/schemas");
const OrbButton_1 = require("./OrbButton");
const firebase_client_1 = require("@eshamanio/firebase-client");
function Signup() {
    const [formStatus, setFormStatus] = (0, react_1.useState)("idle");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.SignupSchema),
    });
    const onSubmit = async (data) => {
        setFormStatus("loading");
        setErrorMessage(null);
        try {
            const functions = (0, firebase_client_1.getFirebaseFunctions)();
            const onUserSignup = (0, firebase_client_1.httpsCallable)(functions, "onUserSignup");
            await onUserSignup(data);
            setFormStatus("success");
        }
        catch (error) {
            setFormStatus("error");
            setErrorMessage(error.message);
        }
    };
    if (formStatus === "success") {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "Welcome to eShaman!" }), (0, jsx_runtime_1.jsx)("p", { className: "text-brand-neutral-dark", children: "Your account is being created. You will be able to log in shortly." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { ...register("name"), placeholder: "Name", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.name.message })), (0, jsx_runtime_1.jsx)("input", { ...register("email"), placeholder: "Email", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.email.message })), (0, jsx_runtime_1.jsx)("input", { ...register("password"), type: "password", placeholder: "Password", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.password.message })), errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errorMessage }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSubmit(onSubmit), title: formStatus === "loading" ? "Creating Account..." : "Create Account", disabled: formStatus === "loading" })] }));
}
