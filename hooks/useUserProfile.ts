import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { getUserProfile } from "@/components/login-form/login-form-for-applicant/service/LoginFormService";

/**
 * Hook to fetch and sync user profile data.
 * Use this hook in any component that needs access to the user profile.
 * When you invalidate the "userProfile" query, this hook will refetch
 * and sync the updated data to the Zustand store.
 */
export const useUserProfile = () => {
    const { user, setUserProfile } = useAuthStore();

    const query = useQuery({
        queryKey: ["userProfile", user?.id],
        queryFn: () => getUserProfile(user?.id || ""),
        enabled: !!user?.id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Sync React Query data with Zustand store when query succeeds
    useEffect(() => {
        if (query.data) {
            setUserProfile(query.data);
        }
    }, [query.data, setUserProfile]);

    return query;
};
