"use client"

import { useRef, useCallback, useEffect } from "react";
import { useAuthStore, useNotificationStore } from "@/store";
import { Notification } from "@/components/notification-drop-down-list/types/types";
import { useUserProfile } from "@/hooks/useUserProfile";

/** WebSocket server URL for real-time notifications */
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/ws/notifications";

/** Interval in milliseconds between reconnection attempts */
const RECONNECT_INTERVAL = 5000;

/** Maximum number of reconnection attempts before giving up */
const MAX_RECONNECT_ATTEMPTS = 10;

/**
 * Custom hook for managing WebSocket connection for real-time notifications.
 * 
 * Features:
 * - Automatic connection when user is authenticated
 * - Automatic disconnection when user logs out
 * - Auto-reconnection with exponential backoff on connection failure
 * - Parses incoming notification messages and adds them to the notification store
 */
export function useWebSocket() {

    /** Reference to the WebSocket instance */
    const wsRef = useRef<WebSocket | null>(null)

    /** Counter for tracking reconnection attempts */
    const reconnectAttempts = useRef(0)

    /** Reference to the reconnection timeout for cleanup */
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    /** Reference to the connect function for use in callbacks */
    const connectRef = useRef<(() => void) | null>(null)

    /** Initialize user profile data */
    useUserProfile()

    /** Get authentication state from auth store */
    const { user, isAuthenticated } = useAuthStore()

    /** Get notification actions from notification store */
    const { addNotification, setWsStatus } = useNotificationStore()

    const connect = useCallback(() => {
        // Guard: Don't connect if user is not authenticated
        if (!isAuthenticated || !user?.id) {
            setWsStatus('disconnected')
            return;
        }

        // Guard: Don't create new connection if one already exists
        if (wsRef.current?.readyState === WebSocket.CONNECTING ||
            wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        // Update status to connecting
        setWsStatus('connecting')

        try {
            // Create WebSocket connection with user ID as query parameter
            const wsUrl = `${WS_BASE_URL}?userId=${user.id}`
            wsRef.current = new WebSocket(wsUrl)

            wsRef.current.onopen = () => {
                console.log("WebSocket connected")
                setWsStatus('connected')
                // Reset reconnect counter on successful connection
                reconnectAttempts.current = 0
            };

            wsRef.current.onmessage = (event) => {
                try {
                    // Parse the raw message data
                    const rawData = JSON.parse(event.data)

                    // Transform raw data into standardized Notification format
                    const notification: Notification = {
                        id: rawData.notificationId || rawData.id || rawData._id,
                        type: rawData.type,
                        title: rawData.title,
                        description: rawData.message || rawData.description,
                        time: rawData.createdAt || rawData.time,
                        read: rawData.isRead ?? rawData.read ?? false,
                        data: rawData.data, // Pass through type-specific data
                    }

                    // Handle notification based on type
                    if (notification.type !== "connected") {
                        // Add notification to store (will trigger UI update)
                        addNotification(notification);
                    } else {
                        console.log("WebSocket: Connected successfully!")
                    }
                } catch (error) {
                    console.error("Error parsing notification data:", error)
                }
            };

            wsRef.current.onclose = (event) => {
                console.log("WebSocket closed:", event.code, event.reason);
                setWsStatus('disconnected')

                // Attempt to reconnect if closure was unexpected (not code 1000)
                // and we haven't exceeded max reconnection attempts
                if (event.code !== 1000 && reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts.current++
                    console.log(`Reconnecting... Attempt ${reconnectAttempts.current}/${MAX_RECONNECT_ATTEMPTS}`);
                    reconnectTimeoutRef.current = setTimeout(
                        () => connectRef.current?.(),
                        RECONNECT_INTERVAL
                    );
                }
            };

            wsRef.current.onerror = (error) => {
                console.log("WebSocket error:", error)
                setWsStatus('error')
            };

        } catch (error) {
            console.log("Failed to create WebSocket connection:", error)
            setWsStatus('error')
        }
    }, [isAuthenticated, user, addNotification, setWsStatus])


    /**
     * Update connectRef whenever connect function changes.
     * This ensures the reconnection callback uses the latest connect function.
     */
    useEffect(() => {
        connectRef.current = connect
    }, [connect]);

    /**
     * Gracefully closes the WebSocket connection.
     * 
     * This function:
     * 1. Clears any pending reconnection timeouts
     * 2. Closes the WebSocket with a normal closure code (1000)
     * 3. Cleans up the WebSocket reference
     * 4. Updates the connection status
     */
    const disconnect = useCallback(() => {
        // Clear any pending reconnection timeout
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
        }

        // Close the WebSocket connection gracefully
        if (wsRef.current) {
            wsRef.current.close(1000, "User logout")
            wsRef.current = null
        }

        // Update status
        setWsStatus('disconnected')
    }, [setWsStatus]);

    /**
     * Effect to automatically manage WebSocket connection based on authentication.
     * - Connects when user becomes authenticated
     * - Disconnects when user logs out
     * - Cleans up connection on component unmount
     */
    useEffect(() => {
        if (isAuthenticated) {
            connect()
        } else {
            disconnect()
        }

        // Cleanup: Disconnect when component unmounts
        return () => {
            disconnect()
        };
    }, [isAuthenticated, connect, disconnect]);

    return { connect, disconnect }
}