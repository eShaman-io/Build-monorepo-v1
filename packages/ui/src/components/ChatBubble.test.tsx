import React from "react";
import { render } from "@testing-library/react-native";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders a user message", () => {
    const { getByText } = render(<ChatBubble message="User message" role="user" />);
    expect(getByText("User message")).toBeTruthy();
  });

  it("renders an oracle message", () => {
    const { getByText } = render(<ChatBubble message="Oracle message" role="assistant" />);
    expect(getByText("Oracle message")).toBeTruthy();
  });
});
