import { useRef, useState, useEffect } from "react";
import { Bell, SquareCheckBig, TriangleAlert, Siren } from "lucide-react";
import { NotificationType } from "../types/types"
import { useNotificationStore } from "@/store";

const useNotificationDropDownButton = () => {
    const { notifications, markAsRead, markAllAsRead, wsStatus, unreadCount } = useNotificationStore()

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

    return {
        isOpen, 
        setIsOpen, 
        popupRef, 
        buttonRef, 
        notifications, 
        unreadCount,
        markAllAsRead,
        markAsRead,
        getNotificationIcon,
        getNotificationBg,
        wsStatus,
    }
}

export default useNotificationDropDownButton