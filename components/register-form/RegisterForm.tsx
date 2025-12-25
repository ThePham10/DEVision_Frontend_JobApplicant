"use client";

import { HeadlessForm } from "@/components/headless-form/Form";
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