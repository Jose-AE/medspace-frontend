import { Meta, StoryObj } from "@storybook/react";
import TenantRequestItem from "./TenantRequestItem";

const meta: Meta<typeof TenantRequestItem> = {
  title: "Components/TenantRequestItem",
  component: TenantRequestItem,
  tags: ["autodocs"],
  args: {
    requestPreview: {
      clinicAddress: "123 Main St, Springfield",
      clinicDisplayName: "Springfield Medical Center",
      clinicId: 1,
      clinicMainPhotoPath: "/pfp_placeholder.png",

      clinicAvailabilities: [],
      comments: "Looking forward to your visit!",
      id: 1,
      requestedDays: [],
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      landlordFullName: "John Doe",
      landlordId: 1,
      landlordProfilePictureUrl: "/pfp_placeholder.png",
      tenantFullName: "Jane Smith",
      tenantId: 2,
      tenantProfilePictureUrl: "/pfp_placeholder.png",
      status: "PENDING",
      tenantSpecialty: "General Practitioner"
    },

    setRequests: (requests) => {
      console.log("Requests updated:", requests);
    }
  }
};

export default meta;
type Story = StoryObj<typeof TenantRequestItem>;

export const Default: Story = {};
