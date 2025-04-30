import { Meta, StoryObj } from "@storybook/react";
import DashboardTabs from "./DashboardTabs";

const meta: Meta<typeof DashboardTabs> = {
  title: "Components/DashboardTabs",
  component: DashboardTabs,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    onTabChange: {
      description: "Callback that fires when a tab is selected"
    },
    defaultTab: {
      control: "text",
      description: "Default selected tab ID"
    },
    className: {
      description: "Additional CSS classes"
    }
  }
};

export default meta;
type Story = StoryObj<typeof DashboardTabs>;

// Default DashboardTabs
export const Default: Story = {
  args: {
    onTabChange: (tab) => console.log("Selected tab:", tab)
  }
};

// DashboardTabs with custom default tab
export const CustomDefaultTab: Story = {
  args: {
    onTabChange: (tab) => console.log("Selected tab:", tab),
    defaultTab: "clinic"
  }
};

// DashboardTabs with custom styling
export const CustomStyling: Story = {
  args: {
    onTabChange: (tab) => console.log("Selected tab:", tab),
    className: "bg-blue-50"
  }
}; 