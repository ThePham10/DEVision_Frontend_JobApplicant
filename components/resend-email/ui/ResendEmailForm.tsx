"use client";

import { HeadlessForm } from "@/components/headless-form";
import { useResendEmail } from "../hook/useResendEmail";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const ResendEmailForm = () => {
    // Resend Email hook
    const { formConfig, handleSubmit, error, success } = useResendEmail();

    return (
        <div className="w-full max-w-md">
            {/* Error message */}
            {error && (
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            
            {/* Success message */}
            {success && (
                <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                    {success}
                </div>
            )}

            {/* Form */}
            {!success && (
                <>
                    <HeadlessForm config={formConfig} onSubmit={handleSubmit} />
                    
                    <div className="mt-6 text-center">
                        <Link 
                            href="/login" 
                            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </>
            )}

            {success && (
                <div className="mt-6 text-center">
                    <Link 
                        href="/login" 
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Return to Login
                    </Link>
                </div>
            )}
        </div>
    );
};
