import { FormValues, loginValidations } from "@/components/headless-form";
import { loginUser, getUserProfile } from "../service/LoginFormService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const useLoginForm = () => {
    // Initialize auth store and router and states
    const { setUser, setIsAuthenticated, setUserProfile } = useAuthStore();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthStore();

    // Define the form configuration for applicant login
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

    // Fetch user profile using React Query
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

    // Handle applicant login form submission
    const handleSubmit = async (values: FormValues) => {
        try {
            const loginData = {
                email: values.email as string,
                password: values.password as string,
            };

            const response = await loginUser(loginData);

            // Check if login is successful
            // If email is not verified, clear user and redirect to verify-email page
            if (response.status === 201) {
                setError(null);
                setUser(response.data.user);
                setIsAuthenticated(true);
                if (response.data.user.emailVerified) {
                    router.push("/jobs");
                } else {
                    router.push("/verify-email");
                }
            } else {
                setError("Invalid email/password or account is not active. Please try again.")
            }
        } catch (err) {
            setError("Login failed. Please try again.")
            console.error("Login error:", err);
        }
    }

    return {
        formConfig,
        handleSubmit,
        error
    }
}