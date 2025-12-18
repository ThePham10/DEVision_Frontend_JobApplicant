import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
    id: string,
    email: string,
    name: string,
    role: string,
    country: string,
    emailVerified: boolean,
}

interface AuthStore {
    user: AuthUser | null;
    isAuthenticated: boolean;

    setUser: (user : AuthUser) => void;
    clearUser: () => void;
    setIsAuthenticated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user : AuthUser) => 
                set({
                    user,
                }),
            
            clearUser: () => 
                set({
                    user: null,
                    isAuthenticated: false
                }),

            setIsAuthenticated: (state: boolean) => 
                set({
                    isAuthenticated: state
                }),
        }),
        {
            name: "auth-storage"
        }
    )
)