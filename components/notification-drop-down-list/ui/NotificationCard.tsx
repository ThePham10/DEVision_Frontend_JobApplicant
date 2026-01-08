import { Notification, NotificationType } from "../types/types"

type NotificationCardProps = {
    notification: Notification,
    markAsRead: (notificationId: string) => void,
    getNotificationBg: (type: NotificationType) => string,
    getNotificationIcon: (type: NotificationType) => React.ReactNode,
    getRelativeTime: (timestamp: string) => string,
}

export const NotificationCard = ({ notification, markAsRead, getNotificationBg, getNotificationIcon, getRelativeTime }: NotificationCardProps) => {
    return (
        <div
            key={notification.id}
            className={`group relative flex gap-3 pl-5 pr-4 py-3 border-b border-slate-50 cursor-pointer transition-all duration-200 ${
                notification.read 
                    ? "bg-white hover:bg-slate-50" 
                    : "bg-gradient-to-r from-indigo-50/50 to-white hover:from-indigo-50"
            }`}
            onClick={() => markAsRead(notification.id)}
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
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                    {notification.description}
                </p>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                    {getRelativeTime(notification.time)}
                </span>
            </div>
        </div>
    )
}