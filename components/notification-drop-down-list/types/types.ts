export type NotificationType =
    | "ProfileUpdateAlert"
    | "PremiumExpiredAlert"
    | "ApplicationAlert_Pass"
    | "JobMatchingAlert"
    | "connected";

// Data for JA_NEW_MATCHING_JOB type
export type MatchingJobData = {
    jobId: string;
    jobTitle: string;
    companyId: string;
    companyName: string;
    location: string;
    salaryType: string;
    salaryCurrency: string;
    salaryRange?: { min: number; max: number };
    employmentType: string;
    matchScore: number;
    matchedCriteria?: object;
};

// Data for JA_PROFILE_UPDATED type
export type ProfileUpdatedData = {
    profileId: string;
    changedFields: string[];
    isPremium: boolean;
};

export type NotificationData = MatchingJobData | ProfileUpdatedData;

export type Notification = {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    time: string;
    read: boolean;
    data?: NotificationData;
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