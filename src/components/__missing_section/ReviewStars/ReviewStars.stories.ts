import { Meta, StoryObj } from "@storybook/react";
import ReviewStars from "./ReviewStars";

const meta: Meta<typeof ReviewStars> = {
  title: "Components/ReviewStars",
  component: ReviewStars,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: { type: "number", min: 0, max: 5, step: 1 },
      description: "The rating value (0-5)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewStars>;

export const Default: Story = {
  args: {
    rating: 3,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5,
  },
};

export const NoRating: Story = {
  args: {
    rating: 0,
  },
};
