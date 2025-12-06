"use client";

import React from "react";
import {HeadlessForm} from "@/components/form/Form";
import {DEVisionLogoButton} from "@/components/DEVisionLogoButton";

export default function Page() {
    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        formTitle: "Login to DEVision",
        children: [
            {
                title: "Email *",
                type: "email",
                placeholder: "test@gmail.com"
            },
            {
                title: "Password *",
                type: "password",
                placeholder: "***************"
            },
            {
                title: "Confirm Password *",
                type: "password",
                placeholder: "***************"
            },
            {
                title: "Country *",
                type: "country",
                placeholder: "Vietnam"
            },
            {
                title: "Phone Number *",
                type: "phoneNumber",
                placeholder: "0912345678"
            }
        ],
        buttonText: "Register",
    };

    return (
        <div className="flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-10 gap-8">
            <DEVisionLogoButton />

            <div className="bg-white rounded-lg shadow-md p-8 mx-150 min-w-[700px]">
                <div className="font-[Inter] text-3xl font-bold mb-4">
                    Create Your Account
                </div>
                <div className="font-[Inter] text-[#65758B] mb-4">
                    Join DEVision to start your tech career journey
                </div>

                <button className="w-full bg-white border border-[#2463EB] rounded-md text-[#2463EB] py-2 px-4 mb-6 flex items-center justify-center hover:bg-gray-50">
                    <div className={"flex my-1"}>
                        <img src="/google_logo.svg" alt="Google logo" className="w-5 h-5 mr-2"/>
                        Continue with Google
                    </div>
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <HeadlessForm config={formConfig} onSubmit={() => {console.log("Register successfully")}}/>
            </div>
        </div>
    )
}