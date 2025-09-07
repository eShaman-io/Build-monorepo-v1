import type { Meta, StoryObj } from "@storybook/react";
import { OrbButton } from "../components/OrbButton";

const meta: Meta<typeof OrbButton> = {
  title: "components/OrbButton",
  component: OrbButton,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export default meta;

type Story = StoryObj<typeof OrbButton>;

export const Primary: Story = {
  args: {
    title: "Click Me",
  },
};
