"use client";

import { HeadlessForm, commonValidations, FormValues } from "@/components/form/Form";
import registerUser from "./service/RegisterFormService";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const { setUser } = useAuthStore();
    const router = useRouter();

    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "Name *",
                name: "name",
                type: "text",
                placeholder: "John Doe",
                validation: commonValidations.name,
            },
            {
                title: "Email *",
                name: "email",
                type: "email",
                placeholder: "test@gmail.com",
                validation: commonValidations.email,
            },
            {
                title: "Password *",
                name: "password",
                type: "password",
                placeholder: "***************",
                validation: commonValidations.password,
            },
            {
                title: "Confirm Password *",
                name: "confirmPassword",
                type: "password",
                placeholder: "***************",
                validation: {
                    required: true,
                    requiredMessage: "Please confirm your password",
                    match: "password",
                    matchMessage: "Passwords do not match",
                },
            },
            {
                title: "Country *",
                name: "country",
                type: "country",
                placeholder: "Vietnam",
                validation: {
                    required: true,
                    requiredMessage: "Please select a country",
                },
            },
            {
                title: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "+84 912345678",
                validation: commonValidations.phone,
            },
            {
                title: "Street name/number",
                name: "street",
                type: "text",
                placeholder: "123 Main St",
            },
            {
                title: "City",
                name: "city",
                type: "text",
                placeholder: "Ho Chi Minh City",
            },
        ],
        buttonText: "Register",
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            // Prepare data for registration (exclude confirmPassword)
            const registerData = {
                name: values.name,
                email: values.email,
                password: values.password,
                country: values.country,
                phone: values.phone || undefined,
                street: values.street || undefined,
                city: values.city || undefined,
            };

            const response = await registerUser(registerData);
            if (response.status === 201) {
                console.log("Registration successful!");
                setUser(response.data);
                router.push("/login");
            }

        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
    )
}