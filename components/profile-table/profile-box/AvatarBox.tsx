"use client"

import { AvatarFrame } from "@/components/reusable-component/AvatarFrame"
import { EditButton } from "@/components/reusable-component/EditButton"
import { useAuthStore } from "@/store/authStore";
import { MapPinned } from "lucide-react";

const AvatarBox = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) return null;
    
    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Gradient decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex items-center gap-8">
                <div className="relative">
                    <AvatarFrame size={130} className="rounded-full" />
                    <EditButton />
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
                        {user.name}
                    </h2>
                    {user.country && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPinned className="w-4 h-4 text-blue-500" />
                            <span className="text-base">{user.country}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AvatarBox;