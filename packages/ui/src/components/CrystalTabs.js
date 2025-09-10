"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrystalTabs = CrystalTabs;
const jsx_runtime_1 = require("react/jsx-runtime");
function CrystalTabs({ tabs, activeTab, onTabChange, className = "", style, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `crystal-tabs flex bg-white/5 rounded-2xl p-1 border border-white/10 ${className}`, style: style, children: tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return ((0, jsx_runtime_1.jsxs)("button", { className: `flex-1 px-4 py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${isActive
                    ? "bg-blue-500/20 border border-blue-400/30 text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-slate-200 hover:bg-white/5"}`, onClick: () => onTabChange(tab.id), children: [tab.icon && (0, jsx_runtime_1.jsx)("div", { className: "mb-1", children: tab.icon }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: tab.label })] }, tab.id));
        }) }));
}
