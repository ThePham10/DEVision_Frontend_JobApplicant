"use client"

import { useRef, useCallback, useEffect } from "react";
import { useAuthStore, useNotificationStore } from "@/store";
import { Notification } from "@/components/notification-drop-down-list/types/types";


const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/ws/notifications";
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 10;

export function useWebSocket() {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttempts = useRef(0)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const connectRef = useRef<(() => void) | null>(null);

    const { user, isAuthenticated } = useAuthStore();
    const { addNotification, setWsStatus } = useNotificationStore();

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
                    const data = JSON.parse(event.data)
                    const notification : Notification = {
                        id: data.id,
                        type: data.type,
                        title: data.title,
                        description: data.description,
                        time: data.time,
                        read: data.read,
                    }
                    console.log("🔔 Adding notification:", notification)
                    addNotification(notification)
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
    }, [isAuthenticated, user, addNotification, setWsStatus])

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