"use client"

import { useRef, useCallback, useEffect } from "react";
import { useAuthStore, useNotificationStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Notification, NotificationType } from "@/components/notification-drop-down-list/types/types";
import { useUserProfile } from "@/hooks/useUserProfile";

// Notification types related to subscription changes
const SUBSCRIPTION_NOTIFICATION_TYPES: NotificationType[] = [
    "PremiumExpiredAlert",
    "ApplicationAlert_Pass"
];


const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/ws/notifications";
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 10;

export function useWebSocket() {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttempts = useRef(0)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const connectRef = useRef<(() => void) | null>(null);
    useUserProfile()

    const { user, isAuthenticated } = useAuthStore();
    const { addNotification, setWsStatus } = useNotificationStore();
    const queryClient = useQueryClient();

    // Helper function to check if notification is subscription-related
    const isSubscriptionNotification = (notification: Notification): boolean => {
        return SUBSCRIPTION_NOTIFICATION_TYPES.includes(notification.type);
    };

    // Refetch user data when subscription status changes
    const handleSubscriptionNotification = useCallback(() => {
        if (user?.id) {
            queryClient.invalidateQueries({ queryKey: ['userProfile', user.id] });
        }
    }, [queryClient, user]);

    const connect = useCallback(() => {
        if (!isAuthenticated || !user?.id) {
            setWsStatus('disconnected');
            return;
        }

        if (wsRef.current?.readyState === WebSocket.CONNECTING ||
            wsRef.current?.readyState === WebSocket.OPEN) {
            return
        }

        setWsStatus('connecting');

        try {
            const wsUrl = `${WS_BASE_URL}?userId=${user.id}`
            wsRef.current = new WebSocket(wsUrl);

            wsRef.current.onopen = () => {
                console.log("Websocket connected")
                setWsStatus('connected');
                reconnectAttempts.current = 0;
            }

            wsRef.current.onmessage = (event) => {
                try {
                    const rawData = JSON.parse(event.data);
                    const notification: Notification = {
                        id: rawData.notificationId || rawData.id || rawData._id,
                        type: rawData.type,
                        title: rawData.title,
                        description: rawData.message || rawData.description,
                        time: rawData.createdAt || rawData.time,
                        read: rawData.isRead ?? rawData.read ?? false,
                        data: rawData.data, // Pass through type-specific data
                    }
                    if (notification.type !== "connected") {
                        addNotification(notification)

                        // Check if this is a subscription-related notification and refetch user data
                        if (isSubscriptionNotification(notification)) {
                            handleSubscriptionNotification();
                        }
                    } else {
                        console.log("Connected successfully!")
                    }
                } catch (error) {
                    console.error("Error parsing notification data:", error)
                }
            }

            wsRef.current.onclose = (event) => {
                console.log("WebSocket closed:", event.code, event.reason)
                setWsStatus('disconnected');

                if (event.code !== 1000 && reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts.current++;
                    reconnectTimeoutRef.current = setTimeout(() => connectRef.current?.(), RECONNECT_INTERVAL);
                }
            }

            wsRef.current.onerror = (error) => {
                console.log("Websocket error: ", error)
                setWsStatus('error');
            }
        } catch (error) {
            console.log("Failed to create WebSocket connection", error)
            setWsStatus('error');
        }
    }, [isAuthenticated, user, addNotification, setWsStatus, handleSubscriptionNotification])

    // Keep connectRef updated with the latest connect function
    useEffect(() => {
        connectRef.current = connect;
    }, [connect]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
        }
        if (wsRef.current) {
            wsRef.current.close(1000, "User logout")
            wsRef.current = null
        }
        setWsStatus('disconnected')
    }, [setWsStatus])

    useEffect(() => {
        if (isAuthenticated) {
            connect()
        } else {
            disconnect()
        }

        return () => {
            disconnect()
        }
    }, [isAuthenticated, connect, disconnect])

    return { connect, disconnect }
}