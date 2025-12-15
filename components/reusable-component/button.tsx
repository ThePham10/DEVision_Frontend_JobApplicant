"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Button({ text, onClick, style, type = "submit", destination}: { text: string; onClick?: React.MouseEventHandler<HTMLButtonElement>; style?: string; type?: "submit" | "button" | "reset"; destination?: string}) {
    const router = useRouter();
    
    return (
        <motion.button
            type={type}
            className={`bg-[#2463eb] hover:bg-[#2362ebe6] text-white px-6 py-3 rounded-md ${style}`}
            onClick={destination ? () => router.push(destination) : onClick}
            whileHover={{ scale: 1.05, boxShadow: "..." }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {text}
        </motion.button>
    );
}