import Button from "@/components/Button";
import { Bell } from "lucide-react";

export interface Notification {
  id: string;
  message: string;
}

interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDismiss
}) => {
  return (
    <div className="flex justify-between items-center border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
      <div className="flex items-start gap-2">
        <Bell className="w-5 h-5 text-gray-500 mt-1" />
        <p className="text-sm text-gray-800">{notification.message}</p>
      </div>
      <Button
        onClick={() => onDismiss(notification.id)}
        variant="primary"
        size="default"
      >
        Dismiss
      </Button>
    </div>
  );
};
