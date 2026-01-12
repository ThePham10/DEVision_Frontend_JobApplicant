"use client";

import { Loader2, CheckCircle2, XCircle, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useActivateEmailBox } from "../hook/ActivateEmailBoxHook";

interface ActivateEmailPageProps {
  params: Promise<{token: string}>
}

const ActivateEmailBox = ({params}: ActivateEmailPageProps) => {
    const {status, countdown, message} = useActivateEmailBox({params});

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-50 to-transparent opacity-60" />
        </div>

        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-300">
            
            {/* Top Accent Line */}
            <div className={`h-1.5 w-full ${
            status === "loading" ? "bg-blue-500 animate-pulse" :
            status === "success" ? "bg-green-500" : 
            "bg-red-500"
            }`} />

            <div className="p-8 pt-10">
            
            {/* -------------------- LOADING STATE -------------------- */}
            {status === "loading" && (
                <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
                    <div className="relative bg-blue-50 p-5 rounded-full ring-1 ring-blue-100/50">
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin" strokeWidth={2.5} />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    Verifying Email
                </h1>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Please wait a moment while we securely verify your email token...
                </p>
                </div>
            )}

            {/* -------------------- SUCCESS STATE -------------------- */}
            {status === "success" && (
                <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500 slide-in-from-bottom-2">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-50" />
                    <div className="relative bg-green-50 p-5 rounded-full ring-8 ring-green-50/50">
                    <CheckCircle2 className="h-10 w-10 text-green-600" strokeWidth={2.5} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    Email Verified!
                </h1>
                <p className="text-gray-600 leading-relaxed mb-8">
                    {message}
                </p>

                {/* Countdown Banner */}
                <div className="w-full bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 flex items-center justify-center gap-2.5">
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    <span className="text-sm font-medium text-slate-600">
                    Redirecting in <span className="text-slate-900 font-bold">{countdown}s</span>
                    </span>
                </div>

                <Link 
                    href="/login"
                    className="group w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                    Go to Login
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                </div>
            )}

            {/* -------------------- ERROR STATE -------------------- */}
            {status === "error" && (
                <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <div className="mb-8">
                    <div className="bg-red-50 p-5 rounded-full ring-8 ring-red-50/50">
                    <XCircle className="h-10 w-10 text-red-600" strokeWidth={2.5} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    Verification Failed
                </h1>
                <p className="text-gray-500 leading-relaxed mb-8 max-w-xs mx-auto">
                    {message || "The verification link is invalid or has expired. Please request a new one."}
                </p>

                <Link 
                    href="/resend-email"
                    className="group w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-200"
                >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-gray-600 mr-1" />
                    Resend Verification Email
                </Link>
                
                <div className="mt-6">
                    <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
                        Back to Login
                    </Link>
                </div>
                </div>
            )}

            </div>
            
            {/* Footer info (optional) */}
            <div className="bg-gray-50/50 px-8 py-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-medium">DEVision Secure Verification</p>
            </div>
        </div>
        </div>
    );
}

export default ActivateEmailBox