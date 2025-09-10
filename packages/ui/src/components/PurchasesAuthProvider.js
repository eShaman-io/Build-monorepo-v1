"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesAuthProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AuthProvider_1 = require("./AuthProvider");
const PurchasesInitializer = ({ children }) => {
    const { user } = (0, AuthProvider_1.useAuth)();
    // For web, this is a no-op component since React Native Purchases is not available
    // In a real mobile implementation, this would initialize RevenueCat
    (0, react_1.useEffect)(() => {
        // No-op for web - would configure RevenueCat in mobile environment
    }, []);
    (0, react_1.useEffect)(() => {
        // No-op for web - would handle user login/logout in mobile environment
    }, [user]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
const PurchasesAuthProvider = ({ children, }) => {
    return ((0, jsx_runtime_1.jsx)(AuthProvider_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(PurchasesInitializer, { children: children }) }));
};
exports.PurchasesAuthProvider = PurchasesAuthProvider;
