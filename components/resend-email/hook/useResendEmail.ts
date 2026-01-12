import { FormValues, loginValidations } from "@/components/headless-form";
import { useState } from "react";
import { resendVerificationEmail } from "../service/ResendEmailService";
import { useRouter } from "next/navigation";

export const useResendEmail = () => {
    // State
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Router for navigation
    const router = useRouter();

    // Form config
    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "Email Address",
                name: "email",
                type: "email",
                placeholder: "enter.your@email.com",
                validation: loginValidations.email,
            }
        ],
        buttonText: isLoading ? "Sending..." : "Resend Email",
    };

    // Handle submit request
    const handleSubmit = async (values: FormValues) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const data = {
                email: values.email as string,
            };

            const response = await resendVerificationEmail(data);

            if (response.status === 200 || response.status === 201) {
                setSuccess("Verification email sent! Please check your inbox.");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError("Failed to send verification email. Please try again.");
            }
        } catch (err: unknown) {
            console.error("Resend email error:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formConfig,
        handleSubmit,
        error,
        success,
        isLoading
    };
};
