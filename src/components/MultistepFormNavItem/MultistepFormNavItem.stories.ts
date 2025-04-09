import { Meta, StoryObj } from "@storybook/react";
import MultistepFormNavItem from "./MultistepFormNavItem";

const meta: Meta<typeof MultistepFormNavItem> = {
  title: "Components/MultistepFormNavItem",
  component: MultistepFormNavItem,
  tags: ["autodocs"],
  args: {
    stepNumber: 1,
    label: "Basic Info",
    fill: true,
    arrow: true,
  },
  argTypes: {
    stepNumber: {
      control: { type: "number" },
    },
    label: {
      control: { type: "text" },
    },
    fill: {
      control: { type: "boolean" },
    },
    arrow: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultistepFormNavItem>;

export const Original: Story = {};
