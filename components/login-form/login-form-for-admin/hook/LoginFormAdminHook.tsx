import loginAdmin from "../service/LoginAdminFormService";
import { FormValues, loginValidations } from "@/components/headless-form";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLoginFormAdmin = () => {
    // Initialize auth store and router
    const { setUser } = useAuthStore();
    const router = useRouter();
    const [ error, setError ] = useState<string | null>(null);

    // Define the form configuration for admin login
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

    // Handle admin login form submission
    const handleAdminLogin = async (values: FormValues) => {
        try {
            const adminLoginData = {
                email: values.email as string,
                password: values.password as string,
            };

            const response = await loginAdmin(adminLoginData);

            // Check if login is successful 
            if (response.status === 201) {
                setUser(response.data.user);
                toast.success("Login successful");
                router.push("/admin/applicant");
            } else {
                setError("Invalid email/password or account is not an ADMIN. Please try again.")
            }
        } catch (err) {
            setError("Login failed. Your email or password is incorrect. Please try again.")
            console.error("Login error:", err);
        }

    }

    return {
        formConfig,
        handleAdminLogin,
        error
    }
}