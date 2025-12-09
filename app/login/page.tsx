"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {HeadlessForm} from "@/components/form/Form";
import SecondaryButton from "@/components/secondaryButton";
import {DEVisionLogoButton} from "@/components/DEVisionLogoButton";
import { googleAuthService } from "@/services/googleAuthService";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        formTitle: "Login to DEVision",
        children: [
            {
                title: "Email",
                type: "email",
                placeholder: "test@gmail.com"
            },
            {
                title: "Password",
                type: "password",
                placeholder: "***************"
            }
        ],
        buttonText: "Login  ",
    };

    const handleSubmit = (values: FormValues) => {
        console.log("Login successfully with values:", values);
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await googleAuthService.signInWithGoogle();
            localStorage.setItem("idToken", user.idToken);
            console.log("Token saved to localStorage");
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Sign-in error:", err);
            setError(err.message || "Failed to sign in");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            console.log("Signing out...");
            await googleAuthService.signOut();
            localStorage.removeItem("idToken");
            console.log("Signed out successfully");
            router.push("/");
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-30 gap-8">
            <DEVisionLogoButton />
            <div className="bg-white rounded-lg shadow-md p-7 mx-150 min-w-[700px]">
                <div className="flex justify-center font-[Inter] text-3xl font-bold mb-4">
                    {formConfig.formTitle}
                </div>

                <HeadlessForm config={formConfig} onSubmit={() => console.log("Login submitted")}/>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <button 
                    className="w-full bg-white border border-[#2463EB] rounded-md text-[#2463EB] py-2 px-4 mb-6 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}>
                    <div className={"flex my-1"}>
                        <Image src="/google_logo.svg" alt="Google logo" width={20} height={20} className="w-5 h-5 mr-2"/>
                        {isLoading ? "Signing in..." : "Continue with Google"}
                    </div>
                </button>

                <div className="flex flex-col justify-center items-center my-6">
                    <div className="font-[Inter] text-[#65758B] mb-4">
                        Do not have an account
                    </div>
                    <SecondaryButton text={"Sign in"} onClick={() => router.push("/register")} style={"w-81"}/>
                </div>
            </div>
        </div>
    );
}