"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("@testing-library/react-native");
const CrystalTabs_1 = require("../components/CrystalTabs");
describe("UI", () => {
    it("should render CrystalTabs", () => {
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(CrystalTabs_1.CrystalTabs, { tabs: [{ id: "1", label: "Tab 1" }], activeTab: "1", onTabChange: () => { } }));
        expect(getByText("Tab 1")).toBeDefined();
    });
});
