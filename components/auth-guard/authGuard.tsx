"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

interface AuthGuardProps {
    children: React.ReactNode;
    role: string;
}

export const AuthGuard = ({children, role}: AuthGuardProps) => {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== role) {
            router.push("/login");
        }
    }, [isAuthenticated, router, role, user])

    if (!isAuthenticated) {
        return null;
    }

    
    return (<>{children}</>)
}