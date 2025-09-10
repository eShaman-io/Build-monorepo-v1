"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("@testing-library/react-native");
const ChatBubble_1 = require("./ChatBubble");
describe('ChatBubble', () => {
    it('renders a user message', () => {
        const message = { content: 'User message' };
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(ChatBubble_1.ChatBubble, { message: message, role: "user" }));
        expect(getByText('User message')).toBeTruthy();
    });
    it('renders an oracle message', () => {
        const message = { content: 'Oracle message' };
        const { getByText } = (0, react_native_1.render)((0, jsx_runtime_1.jsx)(ChatBubble_1.ChatBubble, { message: message, role: "assistant" }));
        expect(getByText('Oracle message')).toBeTruthy();
    });
});
