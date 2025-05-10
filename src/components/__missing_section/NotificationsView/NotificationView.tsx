"use client";

import { FC, useState } from "react";
import { Notification, NotificationCard } from "./NotificationCard";

interface NotificationListProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationList: FC<NotificationListProps> = ({
  notifications,
  onDismiss
}) => {
  if (notifications.length === 0) {
    return <p className="text-gray-500">No notifications available.</p>;
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

const initialNotifications: Notification[] = [];

const NotificationView: FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <NotificationList
        notifications={[]}
        onDismiss={handleDismiss}
      />
    </div>
  );
};

export default NotificationView;
