"use client"

import { useWebSocket } from "./WebSocketHook"

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    useWebSocket();

    return <>{children}</>
}