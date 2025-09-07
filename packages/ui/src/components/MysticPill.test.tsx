import React from "react";
import { render } from "@testing-library/react-native";
import { MysticPill } from "./MysticPill";

describe("MysticPill", () => {
  it("renders the text", () => {
    const { getByText } = render(<MysticPill text="Test Pill" />);
    expect(getByText("Test Pill")).toBeTruthy();
  });
});
