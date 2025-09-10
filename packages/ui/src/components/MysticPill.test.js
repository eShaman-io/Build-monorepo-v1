"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("@testing-library/react-native");
const MysticPill_1 = require("./MysticPill");
describe("MysticPill", () => {
    it("renders the text", () => {
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(MysticPill_1.MysticPill, { text: "Test Pill" }));
        expect(getByText("Test Pill")).toBeTruthy();
    });
});
