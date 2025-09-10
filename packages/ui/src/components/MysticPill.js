"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysticPill = MysticPill;
const jsx_runtime_1 = require("react/jsx-runtime");
function MysticPill({ text }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-full border border-brand-secondary px-4 py-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-brand-secondary", children: text }) }));
}
