"use client"

import { HeadlessForm } from "@/components/headless-form";
import { useLoginFormAdmin } from "../hook/LoginFormAdminHook";

export const LoginFormAdmin = () => {
    const {
        formConfig,
        handleAdminLogin,
        error,
    } = useLoginFormAdmin();

    return (
        <div>
            {error && (
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            <HeadlessForm config={formConfig} onSubmit={handleAdminLogin} />
        </div>
    )
}