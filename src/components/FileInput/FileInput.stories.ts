import { Meta, StoryObj } from "@storybook/react";
import FileInput from "./FileInput";

const meta: Meta<typeof FileInput> = {
  title: "Components/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  args: {
    label: "Upload official property document",
    onChange: (files) => {
      if (files) {
        console.log(files[0]);
      }
    },
    accept: "application/pdf",
    placeholder: "Select a file",
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};
