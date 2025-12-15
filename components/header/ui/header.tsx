"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/reusable-component/button";
import SecondaryButton from "@/components/reusable-component/secondaryButton";
import { useRouter } from "next/navigation";
import { googleAuthService } from "@/services/googleAuthService";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, clearUser } = useAuthStore();

    const handleSignOut = async () => {
        try {
            await googleAuthService.signOut();
            clearUser();
            console.log("Signed out successfully");
            router.push("/");
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };
    
    return (
        <header>
            <div className="relative h-14 sm:h-16 md:h-18 flex flex-row gap-2 sm:gap-4 justify-between sm:justify-center border-b border-[#E1E7EF] font-[Inter] px-4 sm:px-6 md:px-8 lg:px-0">
                <button
                    className="flex items-center justify-center lg:ml-[162px]"
                    onClick={() => console.log("hello world")}
                >
                    <div>
                        <Image
                            src="/DEVision_JA_Logo.svg"
                            alt="DEVision logo"
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                    </div>
                    <div className="flex font-bold text-lg sm:text-xl md:text-2xl">
                        DEVision
                    </div>
                </button>

                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:flex-auto lg:mr-[162px]">
                    {isAuthenticated ? (
                        <Button text="Sign Out" onClick={handleSignOut} />
                    ) : (
                        <>
                            <SecondaryButton text="Sign in" onClick={() => router.push("/login")} />
                            <Button text="Get Started" onClick={() => router.push("/register")} />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}