import { Meta, StoryObj } from "@storybook/react";
import TimeSelectInput from "./TimeSelectInput";

const meta: Meta<typeof TimeSelectInput> = {
  title: "Components/TimeSelectInput",
  component: TimeSelectInput,
  argTypes: {
    value: {
      control: {
        type: "text"
      }
    },
    onChange: {
      action: "changed"
    },
    disabled: {
      control: {
        type: "boolean"
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof TimeSelectInput>;

export const Default: Story = {
  args: {
    value: "12:00",
    disabled: false
  }
};
