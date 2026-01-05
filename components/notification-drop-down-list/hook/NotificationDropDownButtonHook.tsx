import { useRef, useState, useEffect } from "react";
import { Bell, SquareCheckBig, TriangleAlert, Siren } from "lucide-react";
import { Notification, NotificationType } from "../types/types"

const useNotificationDropDownButton = () => {
    const getNotificationIcon = (type: NotificationType) => {
        const iconClass = "w-5 h-5";
        switch (type) {
            case "ApplicationAlert_Pass":
                return <SquareCheckBig className={`${iconClass} text-green-500`} />;
            case "ApplicationAlert_Reject":
                return <TriangleAlert className={`${iconClass} text-red-500`} />;
            case "JobMatchingAlert":
                return <Siren className={`${iconClass} text-amber-500`} />;
            default:
                return <Bell className={`${iconClass} text-slate-500`} />;
        }
    };   
    
    const getNotificationBg = (type: NotificationType) => {
        switch (type) {
            case "ApplicationAlert_Pass":
                return "bg-green-50";
            case "ApplicationAlert_Reject":
                return "bg-red-50";
            case "JobMatchingAlert":
                return "bg-yellow-50";
            default:
                return "bg-slate-50";
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "ApplicationAlert_Pass",
            title: "Application accepted",
            description: "Your application for Senior Developer was accepted!",
            time: "2m ago",
            read: false,
        },
        {
            id: "2",
            type: "ApplicationAlert_Reject",
            title: "Application rejected",
            description: "Your application for Senior Developer was rejected!",
            time: "1h ago",
            read: false,
        },
        {
            id: "3",
            type: "JobMatchingAlert",
            title: "FPT has posted job that match your search profile",
            description: "FPT has posted job that match your search profile!",
            time: "Yesterday",
            read: false,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

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

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleDismiss = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return {
        isOpen, 
        setIsOpen, 
        popupRef, 
        buttonRef, 
        notifications, 
        unreadCount,
        handleMarkAllAsRead,
        handleMarkAsRead,
        getNotificationIcon,
        getNotificationBg,
        handleDismiss
    }
}

export default useNotificationDropDownButton