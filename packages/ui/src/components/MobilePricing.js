"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilePricing = MobilePricing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_purchases_1 = __importDefault(require("react-native-purchases"));
const GlassCard_1 = require("./GlassCard");
const OrbButton_1 = require("./OrbButton");
function MobilePricing() {
    const [offering, setOffering] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const getOfferings = async () => {
            try {
                const offerings = await react_native_purchases_1.default.getOfferings();
                if (offerings.current) {
                    setOffering(offerings.current);
                }
            }
            catch {
                setError('Could not fetch subscription plans.');
            }
        };
        getOfferings();
    }, []);
    const handlePurchase = async () => {
        if (!offering?.availablePackages[0])
            return;
        setIsLoading(true);
        setError(null);
        try {
            await react_native_purchases_1.default.purchasePackage(offering.availablePackages[0]);
        }
        catch (e) {
            if (!e.userCancelled) {
                setError(e.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    if (!offering) {
        return (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, {});
    }
    return ((0, jsx_runtime_1.jsx)(GlassCard_1.GlassCard, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { className: "p-4", children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "mb-4 text-center text-4xl font-bold text-white", children: "Premium Subscription" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "mb-8 text-center text-brand-neutral-dark", children: "Unlock the full eShaman experience." }), offering.availablePackages.map((pkg) => ((0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { onPress: handlePurchase, title: `Subscribe for ${pkg.product.priceString}/month`, disabled: isLoading }, pkg.identifier))), error && (0, jsx_runtime_1.jsx)(react_native_1.Text, { className: "mt-4 text-center text-red-500", children: error })] }) }));
}
