import React from "react";
import { render } from "@testing-library/react-native";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders a user message", () => {
    const message = { role: "user" as const, content: "User message" };
    const { getByText } = render(<ChatBubble message={message} />);
    expect(getByText("User message")).toBeTruthy();
  });

  it("renders an oracle message", () => {
    const message = { role: "oracle" as const, content: "Oracle message" };
    const { getByText } = render(<ChatBubble message={message} />);
    expect(getByText("Oracle message")).toBeTruthy();
  });
});
