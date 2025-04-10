import { Meta, StoryObj } from "@storybook/react";
import CreateClinicResponseMessage from "./CreateClinicResponseMessage";

const meta: Meta<typeof CreateClinicResponseMessage> = {
  title: "Components/CreateClinicResponseMessage",
  component: CreateClinicResponseMessage,
  tags: ["autodocs"],
  args: {
    title: "Clinic created",
    icon: "success",
    onClose: () => {},
  },
  argTypes: {
    icon: {
      options: ["error", "success"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateClinicResponseMessage>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    icon: "error",
    title: "Something went wrong",
    message:
      "An unexpected error occurred while creating the clinic. Please try again.",
  },
};
