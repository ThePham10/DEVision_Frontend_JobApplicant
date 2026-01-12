"use client";

import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { useState } from "react";

// Define the edit button props
type EditButtonProps = {
    className?: string;
    onClick: () => void;
};

/**
 * Edit button component
 * @param className styling the edit button
 * @param onClick function for handle the on click behavior
 */
export const EditButton = ({ className = "", onClick}: EditButtonProps) => {
    // State for hover
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="absolute bottom-1 right-1">
            {/* Tooltip */}
            <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                transition={{ duration: 0.2 }}
            >
                Change Avatar
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </motion.div>

            {/* Animated glow ring */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                    scale: isHovered ? 1.4 : 1, 
                    opacity: isHovered ? 0.4 : 0 
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Main button */}
            <motion.button
                className={`relative z-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 rounded-full p-2.5 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 border-2 border-white/80 ${className}`}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Camera className="w-5 h-5 text-white" />
            </motion.button>
        </div>
    );
};
