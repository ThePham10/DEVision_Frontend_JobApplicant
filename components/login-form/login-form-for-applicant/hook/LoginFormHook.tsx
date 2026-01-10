import { FormValues, loginValidations } from "@/components/headless-form";
import { loginUser, getUserProfile } from "../service/LoginFormService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginForm = () => {
    const { setUser, setIsAuthenticated, setUserProfile } = useAuthStore();
    const router = useRouter();
    const [ error, setError ] = useState<string | null>(null)

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

    const handleSubmit = async (values: FormValues) => {
        try {
            const loginData = {
                email: values.email as string,
                password: values.password as string,
            };

            const response = await loginUser(loginData);
            if (response.status === 201) {
                const userProfileResponse = await getUserProfile(response.data.user.id);
                if (userProfileResponse) {
                    setUserProfile(userProfileResponse);
                }
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