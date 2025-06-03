import { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/Input",
  component: TextInput,
  argTypes: {
    isInvalid: { control: "boolean" },
    isTextArea: { control: "boolean" },
    label: { control: "text" },
    invalidMessage: { control: "text" },
    className: { control: "text" }
  }
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Default Input",
    type: "text"
  }
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password"
  }
};

export const TextArea: Story = {
  args: {
    label: "Text Area",
    isTextArea: true
  }
};

export const InvalidInput: Story = {
  args: {
    label: "Invalid Input",
    type: "text",
    isInvalid: true,
    invalidMessage: "This field is required."
  }
};
