import type { Meta, StoryObj } from "@storybook/react";
import StarRatingInput from "./StarRatingInput";

const meta: Meta<typeof StarRatingInput> = {
  title: "Components/StarRating",
  component: StarRatingInput,
  tags: ["autodocs"],
  argTypes: {
    defaultRating: {
      control: { type: "number", min: 0, max: 5, step: 1 },
      description: "Valor inicial del rating"
    },
    onChange: {
      action: "changed",
      description: "Callback cuando el usuario cambia la calificación"
    }
  }
};

export default meta;
type Story = StoryObj<typeof StarRatingInput>;

export const Default: Story = {
  args: {
    defaultRating: 3
  }
};

export const Empty: Story = {
  args: {
    defaultRating: 0
  }
};

export const Interactive: Story = {
  args: {
    defaultRating: 2,
    onChange: (rating: number) => {
      console.log("Nuevo rating:", rating);
    }
  }
};
