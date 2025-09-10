"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBubble = ChatBubble;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
function ChatBubble({ message, role, timestamp, className = '', style, textStyle }) {
    const isUser = role === 'user';
    const containerStyles = {
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        marginVertical: 4,
    };
    const bubbleStyles = {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
    };
    const userBubbleStyles = {
        backgroundColor: 'rgba(0, 212, 255, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderTopRightRadius: 8,
    };
    const assistantBubbleStyles = {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.16)',
        borderTopLeftRadius: 8,
    };
    const textStyles = {
        fontSize: 16,
        lineHeight: 22,
    };
    const userTextStyles = {
        color: '#0A0F1F',
    };
    const assistantTextStyles = {
        color: '#DFE7FF',
    };
    const timestampStyles = {
        fontSize: 12,
        marginTop: 4,
        opacity: 0.6,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [containerStyles, style], className: `chat-bubble ${role} ${className}`, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                bubbleStyles,
                isUser ? userBubbleStyles : assistantBubbleStyles
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                        textStyles,
                        isUser ? userTextStyles : assistantTextStyles,
                        textStyle
                    ], children: message.content }), timestamp && ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                        timestampStyles,
                        isUser ? userTextStyles : assistantTextStyles
                    ], children: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))] }) }));
}
