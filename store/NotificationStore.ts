import { create } from "zustand";
import { Notification } from "@/components/notification-drop-down-list/types/types";

// Define the web socket status
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

// Define the notification store interface
interface NotificationStore {
    notifications: Notification[];
    unreadCount: number;
    wsStatus: WebSocketStatus;
    
    // Actions
    setNotifications: (notifications: Notification[], unreadCount: number) => void;
    addNotification: (notification: Notification) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
    setWsStatus: (status: WebSocketStatus) => void;
}

export const useNotificationStore = create<NotificationStore> (
    (set) => ({
        notifications: [],
        unreadCount: 0,
        wsStatus: 'disconnected',
        
        setNotifications: (notifications : Notification[], unreadCount: number) => set({
            notifications,
            unreadCount,
        }),
        
        addNotification: (notification) => set((state) => {
            // Default read to false if undefined
            const isRead = notification.read === true;
            const newUnreadCount = isRead ? state.unreadCount : state.unreadCount + 1;
            return {
                notifications: [notification, ...state.notifications].slice(0, 50),
                unreadCount: newUnreadCount,
            };
        }),
        
        markAsRead: (id) => set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification && !notification.read) {
                return {
                    notifications: state.notifications.map(n => 
                        n.id === id ? { ...n, read: true } : n
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1),
                };
            }
            return state;
        }),
        
        markAllAsRead: () => set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0,
        })),
        
        removeNotification: (id) => set((state) => {
            const notification = state.notifications.find(n => n.id !== id);
            return {
                notifications: state.notifications.filter(n => n.id !== id),
                unreadCount: notification && !notification.read 
                    ? Math.max(0, state.unreadCount - 1) 
                    : state.unreadCount,
            };
        }),
        
        clearAll: () => set({ notifications: [], unreadCount: 0 }),
        
        setWsStatus: (status) => set({ wsStatus: status }),
    })
);