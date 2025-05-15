import { Meta, StoryObj } from "@storybook/react";
import TenantRequestItem from "./TenantRequestItem";

const meta: Meta<typeof TenantRequestItem> = {
  title: "Components/TenantRequestItem",
  component: TenantRequestItem,
  tags: ["autodocs"],
  args: {
    officeName: "Downtown Clinic",
    date: "April 15, 2025",
    officePhoto: "https://via.placeholder.com/48", // Placeholder image
    onClickCancel: () => alert("Request canceled"),
  },
};

export default meta;
type Story = StoryObj<typeof TenantRequestItem>;

export const Default: Story = {};

export const WithPhoto: Story = {
  args: {
    officePhoto: "https://via.placeholder.com/48",
  },
};

export const WithoutPhoto: Story = {
  args: {
    officePhoto: undefined,
  },
};