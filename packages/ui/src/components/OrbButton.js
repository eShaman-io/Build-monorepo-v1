"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbButton = OrbButton;
const jsx_runtime_1 = require("react/jsx-runtime");
function OrbButton({ onPress, title, disabled = false }) {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: disabled ? undefined : onPress, disabled: disabled, className: `rounded-full p-4 text-center text-lg font-bold text-white ${disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-brand-secondary hover:bg-brand-secondary/80 cursor-pointer"}`, children: title }));
}
