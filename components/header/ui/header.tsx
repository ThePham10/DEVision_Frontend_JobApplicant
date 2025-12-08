"use client";

import React from "react";
import Button from "@/components/button";
import SecondaryButton from "@/components/secondaryButton";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <header>
            <div className="relative h-14 sm:h-16 md:h-18 flex flex-row gap-2 sm:gap-4 justify-between sm:justify-center border-b border-[#E1E7EF] font-[Inter] px-4 sm:px-6 md:px-8 lg:px-0">
                <button
                    className="flex items-center justify-center lg:ml-[162px]"
                    onClick={() => console.log("hello world")}
                >
                    <div>
                        <img
                            src="/DEVision_JA_Logo.svg"
                            alt="DEVision logo"
                            className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                    </div>
                    <div className="flex font-bold text-lg sm:text-xl md:text-2xl">
                        DEVision
                    </div>
                </button>

                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:flex-auto lg:mr-[162px]">
                    <SecondaryButton text={"Sign in"} onClick={() => router.push("/login")} />
                    <Button text={"Get Started"} onClick={() => router.push("/register")} />
                </div>
            </div>
        </header>
    );
}