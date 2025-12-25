"use client"

import { HeadlessForm } from "@/components/headless-form/Form";
import { useLoginForm } from "../hook/LoginFormHook";


export const LoginForm = () => {
    const {
        formConfig,
        handleSubmit,
    } = useLoginForm();

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
    )
}