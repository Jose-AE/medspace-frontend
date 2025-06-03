import type { Meta, StoryObj } from "@storybook/react";
import SelectInput from "./SelectInput";

const meta: Meta<typeof SelectInput> = {
  title: "Components/SelectInput",
  component: SelectInput,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when no option is selected"
    },
    values: {
      control: "object",
      description: "Array of options with name and value properties"
    },
    isInvalid: {
      control: "boolean",
      description: "Whether the input has an error state"
    },
    invalidMessage: {
      control: "text",
      description: "Error message displayed when isInvalid is true"
    },
    label: {
      control: "text",
      description: "Label text for the select input"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const defaultValues = [
  { name: "Option 1", value: "option1" },
  { name: "Option 2", value: "option2" },
  { name: "Option 3", value: "option3" }
];

export const Default: Story = {
  args: {
    values: defaultValues
  }
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Select an option",
    values: defaultValues
  }
};

export const WithLabel: Story = {
  args: {
    label: "Select an option",
    values: defaultValues
  }
};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: "Select an option",
    placeholder: "Choose from the list",
    values: defaultValues
  }
};

export const Invalid: Story = {
  args: {
    label: "Select an option",
    placeholder: "Choose from the list",
    values: defaultValues,
    isInvalid: true,
    invalidMessage: "Please select a valid option"
  }
};

export const Disabled: Story = {
  args: {
    label: "Select an option",
    values: defaultValues,
    disabled: true
  }
};

export const Required: Story = {
  args: {
    label: "Select an option",
    values: defaultValues,
    required: true
  }
};

export const WithManyOptions: Story = {
  args: {
    label: "Select a country",
    placeholder: "Select a country",
    values: [
      { name: "United States", value: "us" },
      { name: "United Kingdom", value: "uk" },
      { name: "Canada", value: "ca" },
      { name: "Australia", value: "au" },
      { name: "Germany", value: "de" },
      { name: "France", value: "fr" },
      { name: "Japan", value: "jp" },
      { name: "China", value: "cn" },
      { name: "India", value: "in" },
      { name: "Brazil", value: "br" }
    ]
  }
};

export const WithCustomClassName: Story = {
  args: {
    values: defaultValues,
    className: "bg-red-500 p-4 rounded-lg"
  }
};
