"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

type EditButtonProps = {
    className?: string;
};

export const EditButton = ({ className = "" }: EditButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/dashboard");
    }

    return (
        <motion.button
            className={`absolute bottom-0 right-0 bg-sky-600/100 hover:bg-sky-700/90 rounded-full p-2 shadow-lg ${className}`}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Image src="/pencil.png" width={20} height={20} alt="Edit" />
        </motion.button>
    );
};
