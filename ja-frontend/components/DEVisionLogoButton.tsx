import React from "react";
import {useRouter} from "next/navigation";

export const DEVisionLogoButton = () => {
    const router = useRouter();

    return (
        <button className="flex items-center"
                onClick={() => router.push('/')}>
            <div>
                <img src="/DEVision_JA_Logo.svg" alt="DEVision logo"/>
            </div>
            <div className="flex font-bold text-2xl">
                DEVision
            </div>
        </button>
    )
}