import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
    id: string,
    email: string,
    name: string,
    avatarUrl?: string,
    role: string,
    country: string,
    emailVerified: boolean,
}

interface AuthStore {
    user: AuthUser | null;
    isAuthenticated: boolean;

    setUser: (user : AuthUser) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user : AuthUser) => 
                set({
                    user,
                    isAuthenticated: true
                }),
            
            clearUser: () => 
                set({
                    user: null,
                    isAuthenticated: false
                })
        }),
        {
            name: "auth-storage"
        }
    )
)