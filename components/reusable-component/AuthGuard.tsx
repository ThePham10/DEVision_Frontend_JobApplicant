"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

// Define the auth guard props
interface AuthGuardProps {
    children: React.ReactNode;
    role?: string;
}

/**
 * Auth guard component
 */
export const AuthGuard = ({children}: AuthGuardProps) => {
    const { isAuthenticated, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Wait for hydration before checking auth
        if (!_hasHydrated) return;
        
        // Check whether the user is authenticated
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [_hasHydrated, isAuthenticated, router])

    // Show nothing while hydrating or if not authenticated
    if (!_hasHydrated || !isAuthenticated) {
        return null;
    }

    return (<>{children}</>)
}
