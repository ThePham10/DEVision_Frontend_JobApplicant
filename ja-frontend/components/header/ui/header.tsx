"use client";

import React from "react";
import Button from "@/components/button";
import SecondaryButton from "@/components/secondaryButton";
import {useRouter} from "next/navigation";

export default function Header () {
    const router = useRouter();

    return (
        <header>
            <div className="relative h-18 flex flex-row gap-4 justify-center border-b-1 border-[#E1E7EF] font-[Inter]">
                <button className="flex items-center justify-center ml-[162px]"
                    onClick={() => console.log("hello world")}>
                    <div>
                        <img src="/DEVision_JA_Logo.svg" alt="DEVision logo"/>
                    </div>
                    <div className="flex font-bold text-2xl">
                        DEVision
                    </div>
                </button>

                <div className="flex-auto flex items-center justify-end gap-3 mr-[162px]">
                    <SecondaryButton text={"Sign in"} onClick={() => router.push("/login")} />
                    <Button text={"Get Started"} onClick={() => router.push('/register')}/>
                </div>
            </div>
        </header>
    )
}