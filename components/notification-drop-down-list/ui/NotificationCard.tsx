import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Notification, NotificationType, MatchingJobData } from "../types/types"

// Define the notification card props
type NotificationCardProps = {
    notification: Notification,
    markAsRead: (notificationId: string) => void,
    getNotificationBg: (type: NotificationType) => string,
    getNotificationIcon: (type: NotificationType) => React.ReactNode,
    getRelativeTime: (timestamp: string) => string,
}

/**
 * Notification card component
 * @param notification notification list
 * @param markAsRead mark notification as read function
 * @param getNotificationBg get notification background color function
 * @param getNotificationIcon get notification icon function
 * @param getRelativeTime get relative time function
 */
export const NotificationCard = ({ notification, markAsRead, getNotificationBg, getNotificationIcon, getRelativeTime }: NotificationCardProps) => {
    //State 
    const [isExpanded, setIsExpanded] = useState(false);
    
    //Router for navigation
    const router = useRouter();

    // Check if the notification is clickable
    const isClickableJobNotification = notification.type === "JobMatchingAlert" && notification.data;

    // Handle click
    const handleClick = () => {
        setIsExpanded(!isExpanded);
        if (!notification.read) {
            markAsRead(notification.id);
        }
    };

    // Handle navigate to job
    const handleNavigateToJob = (e: React.MouseEvent) => {
        // Prevent to trigger the parent click event
        e.stopPropagation();
        
        // Check if the notification is clickable
        if (notification.type === "JobMatchingAlert" && notification.data) {
            const jobData = notification.data as MatchingJobData;
            router.push(`/jobs/${jobData.jobId}`);
        }
    };

    return (
        <div
            key={notification.id}
            className={`group relative flex gap-3 pl-5 pr-4 py-3 border-b border-slate-50 cursor-pointer transition-all duration-200 ${
                notification.read 
                    ? "bg-white hover:bg-slate-50" 
                    : "bg-gradient-to-r from-indigo-50/50 to-white hover:from-indigo-50"
            }`}
            onClick={handleClick}
        >
            {/* Unread indicator */}
            {!notification.read && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            )}
            
            {/* Icon */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${getNotificationBg(notification.type)} flex notifications-center justify-center items-center`}>
                {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex notifications-start justify-between gap-2">
                    <span className={`text-sm leading-tight ${notification.read ? "font-medium text-slate-700" : "font-semibold text-slate-900"}`}>
                        {notification.title}
                    </span>
                    {/* Expand/Collapse indicator */}
                    <span className="flex-shrink-0 text-slate-400">
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </span>
                </div>
                <p className={`text-xs text-slate-500 leading-relaxed mt-0.5 transition-all duration-200 ${
                    isExpanded ? "" : "line-clamp-2"
                }`}>
                    {notification.description}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-slate-400">
                        {getRelativeTime(notification.time)}
                    </span>
                    {isClickableJobNotification && (
                        <button
                            onClick={handleNavigateToJob}
                            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                            View Job
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}