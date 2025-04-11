import { Meta, StoryObj } from "@storybook/react";
import ClinicImageInput from "./ClinicImageInput";

const meta: Meta<typeof ClinicImageInput> = {
  title: "Components/ClinicImageInput",
  component: ClinicImageInput,
  tags: ["autodocs"],
  args: {
    image: null,
    setImage: (image: string | null) => {},
    label: "Upload clinic image",
  },
};

export default meta;
type Story = StoryObj<typeof ClinicImageInput>;

export const Default: Story = {};
