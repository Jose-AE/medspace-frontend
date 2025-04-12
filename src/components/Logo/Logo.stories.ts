import { Meta, StoryObj } from "@storybook/react";
import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["Full", "Icon"],
      description: "Display the full logo or just the icon"
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const IconOnly: Story = {
  args: {
    type: "Icon"
  }
};

export const FullLogo: Story = {
  args: {
    type: "Full",
    className: "w-40 h-20"
  }
};
