import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button Atomic",
  tags: ["autodocs"],
};
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    variant: "primary",
    children: "Primary Button",
    className: "p-7",
  },
};

export const Danger: StoryObj<typeof meta> = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

export const CustomRender: StoryObj<typeof meta> = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Button {...args} style={{ color: "red" }}>
      Custom Render Button
    </Button>
  ),
};
