"use client";
import { PersonalBoxForm } from "../PersonalSettingForm";

export const PersonalBox = () => {
    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-6">
                <div className="font-[Inter] text-3xl font-bold mb-4">
                    Personal Information
                </div>
                
                <div className="font-[Inter] text-[#65758B] mb-4">
                    Update your account details
                </div>

                <PersonalBoxForm />
            </div>
             
        </div>
    )
}
