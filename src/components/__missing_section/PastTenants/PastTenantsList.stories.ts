import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PastTenantCard, { PastTenant } from "./PastTenantCard";

const meta: Meta<typeof PastTenantCard> = {
  title: "Components/PastTenantCard",
  component: PastTenantCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PastTenantCard>;

const tenantMockHighRating: PastTenant = {
  id: "1",
  name: "John Doe",
  agreementDate: "Diciembre 2021",
  specialty: "Cardiologist",
  rating: 5,
};

const tenantMockLowRating: PastTenant = {
  id: "2",
  name: "Jane Smith",
  agreementDate: "Diciembre 2021",
  specialty: "Pediatry",
  rating: 2,
};

export const HighRating: Story = {
  args: {
    tenant: tenantMockHighRating,
  },
};

export const LowRating: Story = {
  args: {
    tenant: tenantMockLowRating,
  },
};
