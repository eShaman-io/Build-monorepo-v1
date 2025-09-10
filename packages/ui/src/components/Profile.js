"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = Profile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("@eshamanio/schemas");
const OrbButton_1 = require("./OrbButton");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
const firestore_1 = require("firebase/firestore");
function Profile() {
    const { user, loading: authLoading } = (0, AuthProvider_1.useAuth)();
    const [formStatus, setFormStatus] = (0, react_1.useState)("idle");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const { register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.UserProfileSchema),
    });
    (0, react_1.useEffect)(() => {
        if (user) {
            const db = (0, firebase_client_1.getFirebaseDb)();
            const userDocRef = (0, firestore_1.doc)(db, "users", user.uid);
            const unsubscribe = (0, firestore_1.onSnapshot)(userDocRef, (doc) => {
                if (doc.exists()) {
                    reset(doc.data());
                }
            });
            return () => unsubscribe();
        }
    }, [user, reset]);
    const onSubmit = async (data) => {
        setFormStatus("loading");
        setErrorMessage(null);
        try {
            const functions = (0, firebase_client_1.getFirebaseFunctions)();
            const updateUserProfile = (0, firebase_client_1.httpsCallable)(functions, "updateUserProfile");
            await updateUserProfile(data);
            setFormStatus("success");
        }
        catch (error) {
            setFormStatus("error");
            setErrorMessage(error.message);
        }
    };
    if (authLoading) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." });
    }
    if (!user) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Please log in to view your profile." });
    }
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold", children: "Your Profile" }), (0, jsx_runtime_1.jsx)("input", { ...register("name"), placeholder: "Your Name", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.name.message })), (0, jsx_runtime_1.jsx)("input", { ...register("avatarUrl"), placeholder: "Avatar URL", className: "rounded-lg bg-brand-primary-light p-4 text-white" }), errors.avatarUrl && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errors.avatarUrl.message })), errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: errorMessage }), formStatus === "success" && ((0, jsx_runtime_1.jsx)("p", { className: "text-green-500", children: "Profile updated successfully!" })), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleSubmit(onSubmit), title: formStatus === "loading" ? "Saving..." : "Save Profile", disabled: formStatus === "loading" })] }));
}
