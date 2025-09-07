import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { OrbButton } from "./OrbButton";

describe("OrbButton", () => {
  it("renders the title", () => {
    const { getByText } = render(
      <OrbButton title="Test Button" onPress={() => {}} />,
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <OrbButton title="Test Button" onPress={onPressMock} />,
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
