"use client";

import { HeadlessForm } from "@/components/headless-form";
import { useRegisterForm } from "./hook/RegisterFormHook";

/**
 * The register form component
 * The register form component use the headless form with the form config defined in the register form hook
 * 
 * Flow: Register form <- Register form hook <- Register form service
 */
export const RegisterForm = () => {
    const {
        formConfig,
        handleSubmit
    } = useRegisterForm();

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
    )
}