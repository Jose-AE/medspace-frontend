import { Meta, StoryObj } from "@storybook/react";
import RentAgreementPreview from "./RentAgreementPreview";

const meta: Meta<typeof RentAgreementPreview> = {
  title: "Components/RentAgreementPreview",
  component: RentAgreementPreview,
  tags: ["autodocs"],
  args: {
    clinicName: "Modern Private Clinic",
    rentalDate: "16 Feb",
    schedule: "12:30 - 15:30",
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    onMessageClick: () => alert("Message Landlord clicked"),
    onReviewClick: () => alert("Review Landlord clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof RentAgreementPreview>;

export const Default: Story = {};

export const WithoutImages: Story = {
  args: {
    images: [],
  },
};

export const WithMultipleImages: Story = {
  args: {
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
};