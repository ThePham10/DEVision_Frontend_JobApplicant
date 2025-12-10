"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {HeadlessForm, loginValidations, FormValues} from "@/components/form/Form";
import SecondaryButton from "@/components/secondaryButton";
import {DEVisionLogoButton} from "@/components/DEVisionLogoButton";
import { googleAuthService } from "@/services/googleAuthService";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function Page() {
    const router = useRouter();
    const { setUser } = useAuthStore();


    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        //formTitle: "Login to DEVision",
        children: [
            {
                title: "Email",
                name: "email",
                type: "email",
                placeholder: "test@gmail.com",
                validation: loginValidations.email,
                
            },
            {
                title: "Password",
                name: "password",
                type: "password",
                placeholder: "***************",
                validation: loginValidations.password,
            }
        ],
        buttonText: "Login  ",
    };

    const handleSubmit = (values: FormValues) => {
        console.log("Login successfully with values:", values);
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await googleAuthService.signInWithGoogle();
            setUser(user);
            console.log("Login:", user);
            router.push("/dashboard");
        } catch (err) {
            console.error("Sign-in error:", err);
        } 
    };

    return (
        <div className="flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-30 gap-8">
            <DEVisionLogoButton />
            <div className="bg-white rounded-lg shadow-md p-7 mx-150 min-w-[700px]">
                <div className="flex justify-center font-[Inter] text-3xl font-bold mb-4">
                    Login to DEVision
                </div>

                <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                    className="w-full bg-white border border-[#2463EB] rounded-md text-[#2463EB] py-2 px-4 mb-6 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                    onClick={handleGoogleSignIn}>
                    <div className={"flex my-1"}>
                        <Image src="/google_logo.svg" alt="Google logo" width={20} height={20} className="w-5 h-5 mr-2"/>
                        {"Continue with Google"}
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
