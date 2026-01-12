import { useAuthStore } from "@/store/authStore";
import { FormValues } from "@/components/headless-form/types/types";
import { getUserInfo, updateUserInfo } from "../api/PersonalBoxService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AccountData } from "../types";
import { fetchCountries, Country } from "@/components/headless-form/country-drop-down-menu/api/countryDropDownMenuService";
import toast from "react-hot-toast";

export function usePersonalSettingForm() {
    // States
    const { isAuthenticated, user, isAdmin } = useAuthStore();
    const queryClient = useQueryClient();

    // Fetch user info using user ID
    // Only fetch when the user is authenticated, user exists, and the user is not an admin
    const { data: fetchedData } = useQuery({
        queryKey: ['userInfo', user?.id],
        queryFn: () => {
            if (!user) throw new Error("User not found");
            return getUserInfo(user.id);
        },
        enabled: isAuthenticated && !!user && !isAdmin,
    });

    // Fetch countries to get full names
    const { data: countries = [] } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
        staleTime: Infinity, // Countries don't change often
    });

    // User account data
    const userAccount = fetchedData?.data;

    // Get full country name from code
    const getCountryName = (code: string | undefined): string => {
        if (!code) return "";
        const country = countries.find(
            (c: Country) => c.value.toUpperCase() === code.toUpperCase()
        );
        return country?.label || code;
    };

    // Update user info in backend on the server
    // On success, refetches the latest user info and updates the query cache
    const updateMutation = useMutation({
        mutationFn: (data: Partial<AccountData>) => updateUserInfo(data),
        onSuccess: async () => {
            if (!user) return;
            await getUserInfo(user.id);
            queryClient.invalidateQueries({ queryKey: ['userInfo', user.id] });
            toast.success("User info updated successfully");
        },
        onError: () => {
            toast.error("User info update failed");
        }
    });

    // Handle form submission
    const handleSubmit = async (values: FormValues) => {
        updateMutation.mutate(values as Partial<AccountData>);
    };

    // Initial values for the form
    const initialValues = {
        name: userAccount?.name || "",
        phone: userAccount?.phone || "",
        country: userAccount?.country || "",
    };

    return {
        isAuthenticated,
        user,
        userAccount,
        getCountryName,
        handleSubmit,
        initialValues,
    };
}
