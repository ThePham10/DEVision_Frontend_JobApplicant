"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { DEVisionLogoButton, Ribbon } from "@/components/reusable-component";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    // Separate effect for navigation when countdown reaches 0
    useEffect(() => {
        if (countdown === 0) {
            router.push("/login");
        }
    }, [countdown, router]);

    // Countdown timer effect
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleGoToLogin = () => {
        router.push("/login");
    };

    return (
        <div className="relative flex flex-col min-h-screen items-center justify-center bg-[#f1f5f9]/30 px-4 py-10 sm:p-10 gap-6 sm:gap-8 overflow-hidden">
            {/* Animated ribbon background */}
            <Ribbon words={["CHECK EMAIL", "*", "VERIFY", "*", "ACTIVATE", "*", "CONFIRM", "*", "ALMOST THERE"]} />

            {/* Logo */}
            <div className="z-10 absolute top-6 sm:top-10">
                <DEVisionLogoButton />
            </div>

            {/* Main content card */}
            <div className="z-10 bg-white rounded-xl shadow-lg p-6 sm:p-10 w-full max-w-[500px] sm:max-w-[550px] text-center">
                {/* Success icon with animation */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#2463EB] to-[#E06565] rounded-full flex items-center justify-center shadow-lg">
                            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="font-[Inter] text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    Check Your Email
                </h1>

                {/* Description */}
                <p className="font-[Inter] text-[#2463eb] text-sm sm:text-base mb-6 leading-relaxed">
                    We&apos;ve sent a verification link to your email address. 
                    Please click the link to activate your account and complete your registration.
                </p>

                {/* Info box */}
                <div className="bg-[#EEF2FF] border border-[#2463eb] rounded-lg p-4 mb-6">
                    <p className="font-[Inter] text-sm text-[#2463eb]">
                        💡 Don&apos;t forget to check your spam folder if you don&apos;t see the email in your inbox.
                    </p>
                </div>

                {/* Countdown */}
                <p className="font-[Inter] text-[#2463eb] text-sm mb-4">
                    Redirecting to login in{" "}
                    <span className="font-bold text-[#2463eb] text-lg">{countdown}</span>{" "}
                    seconds...
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-[#2463EB] to-[#E06565] rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(countdown / 10) * 100}%` }}
                    />
                </div>

                {/* Go to login button */}
                <button
                    onClick={handleGoToLogin}
                    className="group w-full bg-gradient-to-r from-[#2463EB] to-[#E06565] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-[Inter] font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                    Go to Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

            {/* Footer text */}
            <p className="z-10 font-[Inter] text-[#65758B] text-xs sm:text-sm text-center max-w-md">
                Having trouble? Contact our support team at{" "}
                <a href="mailto:support@devision.com" className="text-[#6366F1] hover:underline">
                    support@devision.com
                </a>
            </p>
        </div>
    );
}
