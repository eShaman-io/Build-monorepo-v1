"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlassCard = GlassCard;
const jsx_runtime_1 = require("react/jsx-runtime");
function GlassCard({ children, className = "" }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 ${className}`, style: {
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
        }, children: children }));
}
