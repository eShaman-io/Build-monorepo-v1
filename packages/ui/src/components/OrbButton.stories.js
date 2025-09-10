"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const OrbButton_1 = require("../components/OrbButton");
const meta = {
    title: "components/OrbButton",
    component: OrbButton_1.OrbButton,
    argTypes: {
        onPress: { action: "pressed" },
    },
};
exports.default = meta;
exports.Primary = {
    args: {
        title: "Click Me",
    },
};
