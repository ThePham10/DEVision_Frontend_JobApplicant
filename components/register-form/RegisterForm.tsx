"use client";

import { HeadlessForm } from "@/components/headless-form";
import { useRegisterForm } from "./hook/RegisterFormHook";

export const RegisterForm = () => {
    const {
        formConfig,
        handleSubmit
    } = useRegisterForm();

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
    )
}