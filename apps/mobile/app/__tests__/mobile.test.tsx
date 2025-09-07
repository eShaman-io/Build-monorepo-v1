import React from "react";
import { render } from "@testing-library/react-native";
import Home from "../(tabs)/home";

describe("Mobile", () => {
  it("should render Home", () => {
    const { getByText } = render(<Home />);
    expect(getByText("What guidance do you seek today?")).toBeDefined();
  });
});
