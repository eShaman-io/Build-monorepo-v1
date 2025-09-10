"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = Login;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = require("firebase/auth");
const OrbButton_1 = require("./OrbButton");
function Login() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)(null);
    const handleLogin = async () => {
        try {
            const auth = (0, auth_1.getAuth)();
            await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        }
        catch (err) {
            setError(err.message);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "rounded-lg bg-brand-primary-light p-4 text-white" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "rounded-lg bg-brand-primary-light p-4 text-white" }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500", children: error }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleLogin, title: "Login" })] }));
}
