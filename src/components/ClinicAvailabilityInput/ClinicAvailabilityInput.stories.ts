import { Meta, StoryObj } from "@storybook/react";
import ClinicAvailabilityInput from "./ClinicAvailabilityInput";

const meta: Meta<typeof ClinicAvailabilityInput> = {
  title: "Components/ClinicAvailabilityInput",
  component: ClinicAvailabilityInput,
  tags: ["autodocs"],
  args: {
    dayOfWeek: "Monday",
    fromTime: "09:00",
    toTime: "18:00",
    onChangeFromTime: (time: string) => {},
    onChangeToTime: (time: string) => {},
    isActive: true,
    onChangeActive: (isActive: boolean) => {},
    error: "",
  },

  argTypes: {
    dayOfWeek: {
      control: {
        type: "select",
        options: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
    fromTime: {
      control: {
        type: "text",
      },
    },
    toTime: {
      control: {
        type: "text",
      },
    },
    // make error optional
    error: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClinicAvailabilityInput>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "From time should be before To time",
  },
};

export const Disabled: Story = {
  args: {
    isActive: false,
  },
};
