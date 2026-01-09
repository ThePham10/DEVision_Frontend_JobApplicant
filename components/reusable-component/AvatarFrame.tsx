"use client"

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { motion } from "motion/react";
import { usePersonalSettingForm } from "../account-box/personal-box/hook/usePersonalSettingForm";

type AvatarFrameProps = {
    size?: number;
    className?: string;
    url?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const AvatarFrame = ({ 
    size = 40, 
    className = "", 
    url, 
    onClick,
}: AvatarFrameProps) => {
    const { user, isAuthenticated } = useAuthStore();
    const { userAccount } = usePersonalSettingForm();

    if (!isAuthenticated || !user) return null;

    const avatarUrl = url || userAccount?.avatarUrl || "/defaultPicture.jpg";
    const ringSize = size + 6;
        
    return (
        <motion.button
            className={`group relative ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ width: ringSize, height: ringSize }}
        >
            {/* Gradient ring border */}
            <div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Glow effect on hover */}
            <div 
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"
            />
            
            {/* Inner white ring (creates gap effect) */}
            <div 
                className="absolute rounded-full bg-white"
                style={{
                    top: 2,
                    left: 2,
                    right: 2,
                    bottom: 2,
                }}
            />
            
            {/* Avatar image */}
            <div 
                className="absolute rounded-full overflow-hidden"
                style={{
                    top: 3,
                    left: 3,
                    width: size,
                    height: size,
                }}
            >
                <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={size}
                    height={size}
                    className="rounded-full object-cover w-full h-full"
                />
            </div>
        </motion.button>
    );
}
