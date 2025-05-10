import { Meta, StoryObj } from "@storybook/react";
import ReviewForm from "./ReviewForm";


const meta: Meta<typeof ReviewForm> = {
  title: "Components/ReviewForm",
  component: ReviewForm,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof ReviewForm>;


export const Default: Story = {};
