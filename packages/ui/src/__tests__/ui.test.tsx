import React from "react";
import { render } from "@testing-library/react-native";
import { CrystalTabs } from "../components/CrystalTabs";

describe("UI", () => {
  it("should render CrystalTabs", () => {
    const { getByText } = render(
      <CrystalTabs
        tabs={[{ id: "1", label: "Tab 1" }]}
        activeTab="1"
        onTabChange={() => {}}
      />,
    );
    expect(getByText("Tab 1")).toBeDefined();
  });
});
