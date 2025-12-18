"use client"

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { motion } from "motion/react";

type AvatarFrameProps = {
    size?: number;
    className?: string;
    url?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const AvatarFrame = ({ size = 40, className = "", url, onClick }: AvatarFrameProps) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) return null;

    const avatarUrl = url || user.avatarUrl;
        
    if(avatarUrl) {
        return (
            <motion.button
                className={`flex items-center ${className}`}
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={size}
                    height={size}
                    className="rounded-full object-cover"
                />
            </motion.button>

        )
    }

    return (
        <motion.button
            className={`flex items-center ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Image
                src="/defaultPicture.jpg"
                alt="Default Avatar"
                width={size}
                height={size}
                className="rounded-full object-cover"
            />
        </motion.button>

    );

}
