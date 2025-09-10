"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = require("firebase/auth");
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthContext = (0, react_1.createContext)({
    user: null,
    loading: true,
});
// NOTE: This is a simplified example. In a real-world app, you'd
// want to handle the Firebase config more securely and robustly.
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
(0, firebase_client_1.initFirebase)(firebaseConfig);
const AuthProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const auth = (0, firebase_client_1.getFirebaseAuth)();
        const unsubscribe = (0, auth_1.onAuthStateChanged)(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { user, loading }, children: children }));
};
exports.AuthProvider = AuthProvider;
const useAuth = () => (0, react_1.useContext)(AuthContext);
exports.useAuth = useAuth;
