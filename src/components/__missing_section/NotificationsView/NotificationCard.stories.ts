import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NotificationCard, Notification } from "./NotificationCard";

const meta: Meta<typeof NotificationCard> = {
  title: "Components/NotificationCard",
  component: NotificationCard,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationCard>;

const mockNotification: Notification = {
  id: "1",
  message: "This is a mock notification",
};

export const Default: Story = {
  args: {
    notification: mockNotification,
    onDismiss: (id: string) => {
      console.log(`Dismissed notification with id: ${id}`);
    },
  },
};
