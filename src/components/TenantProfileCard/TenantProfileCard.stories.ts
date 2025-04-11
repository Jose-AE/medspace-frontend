import { Meta, StoryObj } from "@storybook/react";
import TenantProfileCard from "./TenantProfileCard";

const meta: Meta<typeof TenantProfileCard> = {
  title: "Components/TenantProfileCard",
  component: TenantProfileCard,
};

export default meta;
type Story = StoryObj<typeof TenantProfileCard>;

export const Primary: Story = {};