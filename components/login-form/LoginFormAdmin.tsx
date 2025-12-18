"use client"

import { HeadlessForm, loginValidations } from "../headless-form/Form";
import loginAdmin from "./service/LoginAdminFormService";
import { FormValues } from "../headless-form/types/types";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const LoginFormAdmin = () => {
    const { setUser } = useAuthStore();
    const router = useRouter();

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

    const handleAdminLogin = async (values: FormValues) => {
        try {
            const adminLoginData = {
                email: values.email,
                password: values.password,
            };

            const response = await loginAdmin(adminLoginData);
            if (response.status === 201) {
                setUser(response.data.user);
                router.push("/");
            }
        } catch (err) {
            console.error("Login error:", err);
        }

    }

    return (
        <HeadlessForm config={formConfig} onSubmit={handleAdminLogin} />
    )
}