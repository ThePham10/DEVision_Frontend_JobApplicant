import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { getUserProfile } from "@/components/login-form/login-form-for-applicant/service/LoginFormService";

export const useUserProfile = () => {
    // Auth store
    const { user, setUserProfile } = useAuthStore();

    const isAdmin = user?.role === "admin";
    const query = useQuery({
        queryKey: ["userProfile", user?.id],
        queryFn: () => getUserProfile(user?.id || ""),
        enabled: !!user?.id && !isAdmin,
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
