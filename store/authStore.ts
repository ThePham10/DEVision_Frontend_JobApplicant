import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
    id: string,
    email: string,
    name: string,
    avatarUrl?: string,
    role: string,
    country?: string,
    emailVerified: boolean,
}

interface AuthStore {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    _hasHydrated: boolean;

    setUser: (user : AuthUser) => void;
    clearUser: () => void;
    setIsAuthenticated: (state: boolean) => void;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            _hasHydrated: false,

            setUser: (user : AuthUser) => 
                set({
                    user,
                    isAuthenticated: true,
                    isAdmin: user.role === "admin"
                }),
            
            clearUser: () => 
                set({
                    user: null,
                    isAuthenticated: false,
                    isAdmin: false
                }),

            setIsAuthenticated: (state: boolean) =>
                set({ isAuthenticated: state }),

            setHasHydrated: (state: boolean) =>
                set({ _hasHydrated: state })
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
)