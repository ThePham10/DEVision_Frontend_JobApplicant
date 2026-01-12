import { FormValues, loginValidations } from "@/components/headless-form";
import { loginUser, getUserProfile } from "../service/LoginFormService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLoginForm = () => {
    const { setUser, setIsAuthenticated, setUserProfile } = useAuthStore();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { user, clearUser } = useAuthStore();

    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "Email",
                name: "email",
                type: "email",
                placeholder: "test@gmail.com",
                validation: loginValidations.email,  
            },
            {
                title: "Password",
                name: "password",
                type: "password",
                placeholder: "***************",
                validation: loginValidations.password,
            }
        ],

        buttonText: "Login ",
    };

    const query = useQuery({
        queryKey: ["userProfile", user?.id],
        queryFn: () => getUserProfile(user?.id || ""),
        enabled: !!user?.id,
    });

    // Sync React Query data with Zustand store when query succeeds
    useEffect(() => {
        if (query.data) {
            setUserProfile(query.data);
        }
    }, [query.data, setUserProfile]);

    const handleSubmit = async (values: FormValues) => {
        try {
            const loginData = {
                email: values.email as string,
                password: values.password as string,
            };

            const response = await loginUser(loginData);
            if (response.status === 201) {
                setError(null);
                setUser(response.data.user);
                setIsAuthenticated(true);
                if (response.data.user.emailVerified) {
                    toast.success("Login successful");
                    router.push("/jobs");
                } else {
                    clearUser();
                    toast.error("Please verify your email");
                    router.push("/verify-email");
                }
            } else {
                 setError("Invalid email/password or account is not active. Please try again.")
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "Login failed. Please try again.";
            setError(errorMessage);
        }
    }

    return {
        formConfig,
        handleSubmit,
        error
    }
}