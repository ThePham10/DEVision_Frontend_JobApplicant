export type NotificationType = "ApplicationAlert_Pass" | "ApplicationAlert_Reject" | "JobMatchingAlert" | "connected" | "ProfileUpdateAlert";

export type Notification = {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    time: string;
    read: boolean;
};

export type GetResponse = {
    notifications: Notification[];
    total: number;
    unreadCount: number;
}

export type PatchResponse = {
    success: boolean;
}

export type NotificationCardProps = {
    notification: Notification,
    handleMarkAsRead: (notificationId: string) => void,
    getNotificationBg: (type: NotificationType) => string,
    getNotificationIcon: (type: NotificationType) => React.ReactNode,
    handleDismiss: (notificationId: string) => void,
}