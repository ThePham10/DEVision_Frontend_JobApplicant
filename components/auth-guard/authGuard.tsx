"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

interface AuthGuardProps {
    children: React.ReactNode;
    role?: string;
}

export const AuthGuard = ({children}: AuthGuardProps) => {
    const { isAuthenticated, isAdmin, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Wait for hydration before checking auth
        if (!_hasHydrated) return;
        
        if (!isAuthenticated || !isAdmin) {
            console.log("Not authenticated or not authorized: isAuthenticated=" + isAuthenticated + ", isAdmin=" + isAdmin);
            router.push("/login");
        }
    }, [_hasHydrated, isAuthenticated, isAdmin, router])

    // Show nothing while hydrating or if not authenticated
    if (!_hasHydrated || !isAuthenticated) {
        return null;
    }

    return (<>{children}</>)
}