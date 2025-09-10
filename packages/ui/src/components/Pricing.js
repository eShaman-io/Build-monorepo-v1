"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pricing = Pricing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const stripe_js_1 = require("@stripe/stripe-js");
const firebase_client_1 = require("@eshamanio/firebase-client");
const OrbButton_1 = require("./OrbButton");
const GlassCard_1 = require("./GlassCard");
const AuthProvider_1 = require("./AuthProvider");
const react_i18next_1 = require("react-i18next");
// NOTE: In a real app, the Stripe public key and price ID would be in environment variables.
const stripePromise = (0, stripe_js_1.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const PREMIUM_PRICE_ID = "price_1PQRgRDEa5giQ3_example_premium"; // Example Price ID
function Pricing() {
    const { user } = (0, AuthProvider_1.useAuth)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);
        if (!user) {
            setError("You must be logged in to subscribe.");
            setIsLoading(false);
            return;
        }
        try {
            const functions = (0, firebase_client_1.getFirebaseFunctions)();
            const createCheckoutSession = (0, firebase_client_1.httpsCallable)(functions, "createCheckoutSession");
            const { data } = await createCheckoutSession({
                priceId: PREMIUM_PRICE_ID,
                successUrl: `${window.location.origin}/profile?session_id={CHECKOUT_SESSION_ID}`,
                cancelUrl: window.location.href,
            });
            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.sessionId,
                });
                if (error) {
                    setError(error.message || "Payment error occurred");
                }
            }
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(GlassCard_1.GlassCard, { className: "p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-center text-4xl font-bold", children: t("premium_subscription") }), (0, jsx_runtime_1.jsx)("p", { className: "mb-8 text-center text-brand-neutral-dark", children: "Unlock the full eShaman experience." }), (0, jsx_runtime_1.jsxs)("ul", { className: "mb-8 space-y-2", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2713 ", t("unlimited_oracle")] }), (0, jsx_runtime_1.jsx)("li", { children: "\u2713 Access to all rituals and meditations" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2713 Personalized astrological insights" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2713 Lunar cycle notifications" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2713 Exclusive content from spiritual teachers" })] }), (0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handleCheckout, title: isLoading ? "Redirecting..." : t("subscribe_now"), disabled: isLoading }), error && (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-center text-red-500", children: error })] }));
}
