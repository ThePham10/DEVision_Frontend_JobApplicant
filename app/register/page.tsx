"use client";

import Image from "next/image"
import {HeadlessForm, commonValidations, FormValues} from "@/components/form/Form";
import {DEVisionLogoButton} from "@/components/DEVisionLogoButton";

export default function Page() {
    const formConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "Email *",
                name: "email",
                type: "email",
                placeholder: "test@gmail.com",
                validation: commonValidations.email,
            },
            {
                title: "Password *",
                name: "password",
                type: "password",
                placeholder: "***************",
                validation: commonValidations.password,
            },
            {
                title: "Confirm Password *",
                name: "confirmPassword",
                type: "password",
                placeholder: "***************",
                validation: {
                    required: true,
                    requiredMessage: "Please confirm your password",
                    match: "password",
                    matchMessage: "Passwords do not match",
                },
            },
            {
                title: "Country *",
                name: "country",
                type: "country",
                placeholder: "Vietnam",
                validation: {
                    required: true,
                    requiredMessage: "Please select a country",
                },
            },
            {
                title: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "+84 912345678",
                validation: commonValidations.phone,
            },
            {
                title: "Street name/number",
                name: "street",
                type: "text",
                placeholder: "123 Main St",
                
            },
            {
                title: "City",
                name: "city",
                type: "text",
                placeholder: "Ho Chi Minh City",
                
            }
        ],
        buttonText: "Register",
    };

    const handleSubmit = (values: FormValues) => {
        console.log("Register successfully with values:", values);
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
                        <Image src="/google_logo.svg" 
                                alt="Google logo" 
                                width={20}
                                height={20}
                                className="w-5 h-5 mr-2"/>
                        Continue with Google
                    </div>
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
            </div>
        </div>
    )
}