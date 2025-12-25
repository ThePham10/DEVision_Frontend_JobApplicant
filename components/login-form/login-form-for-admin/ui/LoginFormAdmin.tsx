"use client"

import { HeadlessForm } from "@/components/headless-form/Form";
import { useLoginFormAdmin } from "../hook/LoginFormAdminHook";

export const LoginFormAdmin = () => {
    const {
        formConfig,
        handleAdminLogin,
    } = useLoginFormAdmin();

    return (
        <HeadlessForm config={formConfig} onSubmit={handleAdminLogin} />
    )
}