import { Meta, StoryObj } from "@storybook/react";
import ClinicEquipmentTag from "./ClinicEquipmentTag";

const meta: Meta<typeof ClinicEquipmentTag> = {
  title: "Components/ClinicEquipmentTag",
  component: ClinicEquipmentTag,
  tags: ["autodocs"],
  args: {
    name: "x-ray machine",
  },
};

export default meta;
type Story = StoryObj<typeof ClinicEquipmentTag>;

export const Default: Story = {};
