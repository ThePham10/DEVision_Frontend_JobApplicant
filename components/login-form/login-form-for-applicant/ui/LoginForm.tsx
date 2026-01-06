"use client"

import { HeadlessForm } from "@/components/headless-form";
import { useLoginForm } from "../hook/LoginFormHook";


export const LoginForm = () => {
    const {
        formConfig,
        handleSubmit,
        error
    } = useLoginForm();

    return (
        <>
            {error && (
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
        </>
    )
}