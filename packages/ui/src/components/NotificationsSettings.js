"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsSettings = NotificationsSettings;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Notifications = __importStar(require("expo-notifications"));
const Device = __importStar(require("expo-device"));
const firebase_client_1 = require("@eshamanio/firebase-client");
const AuthProvider_1 = require("./AuthProvider");
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
function NotificationsSettings() {
    const { user } = (0, AuthProvider_1.useAuth)();
    const [status, setStatus] = (0, react_1.useState)(null);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [message, setMessage] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        Notifications.getPermissionsAsync().then((result) => setStatus(result.status));
    }, []);
    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        setStatus(status);
        if (status === "granted") {
            await registerForPushNotificationsAsync();
        }
    };
    const registerForPushNotificationsAsync = async () => {
        if (!Device.isDevice) {
            setMessage("Push notifications are only available on physical devices.");
            return;
        }
        setIsSubmitting(true);
        try {
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            const functions = (0, firebase_client_1.getFirebaseFunctions)();
            const registerPushToken = (0, firebase_client_1.httpsCallable)(functions, "registerPushToken");
            await registerPushToken({ token });
            setMessage("Successfully registered for push notifications!");
        }
        catch (error) {
            setMessage(`Error: ${error.message}`);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (!user) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: "Please log in to manage notifications." });
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "mb-4 text-2xl font-bold", children: "Push Notifications" }), status !== "granted" && ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: requestPermissions, disabled: isSubmitting, className: "rounded-lg bg-brand-secondary p-4", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "text-center text-white", children: isSubmitting ? "Enabling..." : "Enable Notifications" }) })), status === "granted" && (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: "Push notifications are enabled." }), message && (0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "mt-4", children: message })] }));
}
