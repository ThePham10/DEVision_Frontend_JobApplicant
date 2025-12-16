"use client"

import { AvatarFrame } from "@/components/reusable-component/avatarFrame"
import { EditButton } from "@/components/reusable-component/EditButton"
import { useAuthStore } from "@/store/authStore";
import { motion } from "motion/react";

const AvatarBox = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) return null;

    const userName = user.name;
    const userLocation = user.country;
    
    return (
        <div className="w-full bg-white rounded-xl border border-slate-200 p-8 shadow-sm max-w-8/10 ">
            <div className="flex items-center gap-6 ml-10">
                <div className="relative">
                    <AvatarFrame size={130} className="rounded-full" />
                    <EditButton />
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        {userName}
                    </h2>
                    <p className="text-slate-500 text-base">
                        {userLocation}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AvatarBox;