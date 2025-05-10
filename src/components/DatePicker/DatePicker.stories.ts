import { Meta, StoryObj } from "@storybook/react";
import DatePicker from "@/components/DatePicker";
import { addDays, subDays } from "date-fns";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Selection mode of the date picker"
    },
    onSelectDate: {
      description: "Callback that fires when a date is selected"
    },
    fromDate: {
      control: "date",
      description: "Earliest selectable date"
    },
    toDate: {
      control: "date",
      description: "Latest selectable date"
    },
    disabledDates: {
      description: "Array of specific dates to disable"
    },
    className: {
      description: "Additional CSS classes"
    }
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default DatePicker (single mode)
export const Default: Story = {
  args: {
    mode: "single",
    selectedDate: new Date(),
    onSelectDate: (date: Date | undefined) =>
      console.log("Selected date:", date)
  }
};

// With Date Range (single mode)
export const WithDateRange: Story = {
  args: {
    mode: "single",
    selectedDate: new Date(),
    onSelectDate: (date: Date | undefined) =>
      console.log("Selected date:", date),
    fromDate: subDays(new Date(), 5),
    toDate: addDays(new Date(), 30)
  }
};

// With Disabled Dates (single mode)
export const WithDisabledDates: Story = {
  args: {
    mode: "single",
    selectedDate: new Date(),
    onSelectDate: (date: Date | undefined) =>
      console.log("Selected date:", date),
    disabledDates: [new Date(), addDays(new Date(), 2), addDays(new Date(), 5)]
  }
};

// Custom Styling (single mode)
export const CustomStyling: Story = {
  args: {
    mode: "single",
    selectedDate: new Date(),
    onSelectDate: (date: Date | undefined) =>
      console.log("Selected date:", date),
    className: "bg-blue-50 border-blue-200"
  }
};

// Multiple selection mode
export const MultipleSelection: Story = {
  args: {
    mode: "multiple",
    selectedDate: [new Date(), addDays(new Date(), 1)],
    onSelectDate: (dates: Date[] | undefined) =>
      console.log("Selected dates:", dates)
  }
};

// Range selection mode
export const RangeSelection: Story = {
  args: {
    mode: "range",
    selectedDate: {
      from: subDays(new Date(), 2),
      to: addDays(new Date(), 3)
    },
    onSelectDate: (range) => console.log("Selected range:", range)
  }
};
