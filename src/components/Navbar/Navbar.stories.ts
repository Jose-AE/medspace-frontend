import { Meta, StoryObj } from "@storybook/react";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const TenantNavbar: Story = {
  args: {
    variant: "tenant"
  }
};

export const LandlordNavbar: Story = {
  args: {
    variant: "landlord"
  }
};

export const AnalystNavbar: Story = {
  args: {
    variant: "analyst"
  }
};

export const GuestNavbar: Story = {
  args: {
    variant: "guest"
  }
};
