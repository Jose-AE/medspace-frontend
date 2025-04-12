import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL for the avatar image"
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    imageUrl: "/pfp_placeholder.png",
    className: "w-10 h-10"
  }
};
export const CustomImage: Story = {
  args: {
    imageUrl: "https://i.pravatar.cc/300",
    className: "w-12 h-12"
  }
};

export const WithBorder: Story = {
  args: {
    imageUrl: "/pfp_placeholder.png",
    className: "w-12 h-12 border-2 border-blue-500"
  }
};

// Shows fallback when image fails to load
export const Fallback: Story = {
  args: {
    imageUrl: "invalid-url-that-will-fail",
    className: "w-12 h-12"
  }
};
