"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("@testing-library/react-native");
const OrbButton_1 = require("./OrbButton");
describe("OrbButton", () => {
    it("renders the title", () => {
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { title: "Test Button", onPress: () => { } }));
        expect(getByText("Test Button")).toBeTruthy();
    });
    it("calls onPress when pressed", () => {
        const onPressMock = jest.fn();
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(OrbButton_1.OrbButton, { title: "Test Button", onPress: onPressMock }));
        react_native_1.fireEvent.press(getByText("Test Button"));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
