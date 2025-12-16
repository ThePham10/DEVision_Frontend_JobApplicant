"use client"

import { HeadlessForm, loginValidations } from "@/components/headless-form/Form";
import { FormValues } from "@/components/headless-form/types/types";
import loginUser from "./service/LoginFormService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
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

    const handleSubmit = async (values: FormValues) => {
        try {
            const loginData = {
                email: values.email,
                password: values.password,
            };

            const response = await loginUser(loginData);
            if (response.status === 201) {
                console.log("Login successful!");
                setUser(response.data.user);
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    }

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
    )

}