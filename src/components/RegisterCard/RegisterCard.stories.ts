import { Meta, StoryObj } from "@storybook/react";
import RegisterCard from "./RegisterCard";


const meta: Meta<typeof RegisterCard> = {
  title: "Components/RegisterCard",
  component: RegisterCard,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof RegisterCard>;


export const Default: Story = {};


