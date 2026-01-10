"use client";

import { motion } from "motion/react";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePersonalSettingForm } from "@/components/account-box/personal-box/hook/usePersonalSettingForm";

export const PremiumButton = () => {
    const router = useRouter();
    const { userAccount } = usePersonalSettingForm();

    const handleClick = () => {
        router.push("/premium");
    };

    const isPremium = userAccount?.isPremium;

    return (
        <motion.button
        onClick={handleClick}
        className={`relative overflow-hidden flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-all duration-200 group
            ${isPremium
            ? "bg-gradient-to-br from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border border-amber-200/50 text-amber-900"
            : "bg-green-500 hover:bg-green-600 text-white border border-green-600/50"}
        `}
        whileHover={{
            scale: 1.02,
            borderColor: isPremium ? "rgba(251, 191, 36, 0.4)" : "rgba(34,197,94,0.6)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
        {/* Subtle shimmer only for premium */}
        {isPremium && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        )}

        {/* Crown icon */}
        <Crown
            size={16}
            className={`relative z-10 ${isPremium ? "text-amber-600" : "text-white"}`}
            strokeWidth={2}
        />

        {/* Text */}
        <span className="relative z-10 text-sm font-[Inter] tracking-wide">
            {isPremium ? "Premium" : "Free"}
        </span>
        </motion.button>
    );
};
