import { Meta, StoryObj } from "@storybook/react";
import VerifyID from "./VerifyID";


const meta: Meta<typeof VerifyID> = {
  title: "Components/VerifyID",
  component: VerifyID,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof VerifyID>;


export const Default: Story = {};