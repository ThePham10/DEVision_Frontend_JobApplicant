import { DEVisionLogoButton, Ribbon } from "@/components/reusable-component";
import { ResendEmailForm } from "@/components/resend-email/ui/ResendEmailForm";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-10 sm:p-10 md:p-20 lg:p-30 gap-6 sm:gap-8 overflow-hidden">
            {/* Animated ribbon background */}
            <Ribbon words={["RESEND EMAIL", "*", "VERIFY", "*", "ACTIVATE", "*", "CONFIRM", "*", "SECURITY"]} />

            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-5 sm:p-7 w-full max-w-[500px]">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="font-[Inter] text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Resend Verification Email
                    </h1>
                    <p className="text-gray-500 text-center text-sm">
                        Enter your email address and we&apos;ll send you a new link to activate your account.
                    </p>
                </div>

                <div className="flex justify-center">
                    <ResendEmailForm />
                </div>
            </div>
        </div>
    );
}
