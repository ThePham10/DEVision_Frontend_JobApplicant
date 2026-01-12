import { useRef, useState, useEffect, useCallback } from "react";
import { Bell, Siren, AlarmClockPlus, Crown, TimerOff } from "lucide-react";
import { NotificationType } from "../types/types"
import { useNotificationStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { markAllAsRead, markAsRead } from "../service/NotificationDropDownService";
import { getNotificationDropDownList } from "../service/NotificationDropDownService";

/**
 * Notification drop down button hook
 */
const useNotificationDropDownButton = () => {
    // Query client
    const queryClient = useQueryClient();

    // Notification store
    const { 
        notifications,       
        setNotifications,
        unreadCount,
        wsStatus,
    } = useNotificationStore()

    // State
    const [displayCount, setDisplayCount ] = useState(10)
    const displayedNotifications = notifications.slice(0, displayCount)
    const hasMore = displayCount < notifications.length
    const [isOpen, setIsOpen] = useState(false)

    // Ref
    const popupRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)

    // Handle load more function
    const loadMore = useCallback(() => {
        setDisplayCount(prev => Math.min(prev + 10, notifications.length))
    }, [notifications.length])
    
    // Handle load more intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 0.1}
        )
        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }
        return () => observer.disconnect()
    }, [hasMore, loadMore, isOpen])

    // Get notification icon
    function getNotificationIcon(type: NotificationType) {
        const iconClass = "w-5 h-5";
        switch (type) {
            case "JobMatchingAlert":
                return <Siren className={`${iconClass} text-amber-500`} />;
            case "ApplicationAlert_Pass":
                return <Crown className={`${iconClass} text-yellow-500`} />;
            case "PremiumExpiredAlert":
                return <TimerOff className={`${iconClass} text-gray-500`} />;
            case "ProfileUpdateAlert":
                return <AlarmClockPlus className={`${iconClass} text-blue-500`} />;
            default:
                return <Bell className={`${iconClass} text-slate-500`} />;
        }
    };   
    
    // Get notification background color
    function getNotificationBg(type: NotificationType) {
        switch (type) {
            case "JobMatchingAlert":
                return "bg-yellow-50";
            case "ApplicationAlert_Pass":
                return "bg-yellow-50";
            case "PremiumExpiredAlert":
                return "bg-gray-50";
            case "ProfileUpdateAlert":
                return "bg-blue-50";
            default:
                return "bg-slate-50";
        }
    };

    // Get relative time
    function getRelativeTime(timestamp: string): string {
        const now = new Date();
        const date = new Date(timestamp);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    }

    // Fetch historical notifications from REST API
    const {
        data: NotificationData,
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotificationDropDownList(),
    })

    // Load historical notifications into the store when REST data arrives
    // This only runs once on initial load, WebSocket will add new ones on top
    useEffect(() => {
        if (NotificationData?.notifications && Array.isArray(NotificationData.notifications)) {
            setNotifications(NotificationData.notifications, NotificationData.unreadCount);
        }
    }, [NotificationData, setNotifications]);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current && 
                buttonRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Mark as read mutation
    const markAsReadMutation = useMutation({
        mutationFn: ({id}: {id: string}) => 
            markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    })

    // Handle mark as read
    function handleMarkAsRead(id: string) {
        markAsReadMutation.mutate({id});
    }

    // Mark all as read mutation
    const markAllAsReadMutation = useMutation({
        mutationFn: () => markAllAsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    })

    // Handle mark all as read
    function handleMarkAllAsRead() {
        markAllAsReadMutation.mutate();
    }

    return {
        isOpen, 
        popupRef, loaderRef, buttonRef,
        wsStatus,
        hasMore,
        displayedNotifications,
        unreadCount,
        setIsOpen, 
        handleMarkAllAsRead,
        handleMarkAsRead,
        getNotificationIcon,
        getNotificationBg,
        getRelativeTime,
    }
}

export default useNotificationDropDownButton