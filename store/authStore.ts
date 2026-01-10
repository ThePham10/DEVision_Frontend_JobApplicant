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
    isPremium: boolean,  // Premium user flag
}

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  emailVerified: boolean;
  objectiveSummary: string;
  isPremium: boolean;
  avatarUrl: string;
  isActive: boolean;
  skillCategories: string[];
}

interface AuthStore {
    user: AuthUser | null;
    userProfile: UserProfile | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isPremium: boolean;  // Premium user flag
    _hasHydrated: boolean;

    setUser: (user : AuthUser) => void;
    setUserProfile: (userProfile : UserProfile) => void;
    clearUser: () => void;
    setIsAuthenticated: (state: boolean) => void;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            userProfile: null,
            isAuthenticated: false,
            isAdmin: false,
            isPremium: false,  // Default to non-premium
            _hasHydrated: false,

            setUser: (user : AuthUser) => 
                set({
                    user,
                    isAuthenticated: true,
                    isAdmin: user.role === "admin",
                    isPremium: user.isPremium  // Set from user data
                }),
            
            clearUser: () => 
                set({
                    user: null,
                    isAuthenticated: false,
                    isAdmin: false,
                    isPremium: false  // Reset to non-premium
                }),

            setIsAuthenticated: (state: boolean) =>
                set({ isAuthenticated: state }),

            setHasHydrated: (state: boolean) =>
                set({ _hasHydrated: state }),

            setUserProfile: (userProfile : UserProfile) =>
                set({ userProfile })
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
)