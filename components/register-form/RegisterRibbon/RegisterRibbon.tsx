"use client";

import { motion } from "framer-motion";

type RegisterRibbonProps = {
    words?: string[];
    speed?: number; // Duration in seconds for one complete loop
};

export const RegisterRibbon = ({ 
    words = ["REGISTER", "*", "SIGN UP", "*", "JOIN US", "*", "CREATE ACCOUNT", "*", "GET STARTED"],
    speed = 15 
}: RegisterRibbonProps) => {
    // Duplicate words to create seamless loop
    const repeatedWords = [...words, ...words, ...words, ...words, ...words, ...words];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Rotated container for diagonal effect */}
            <div 
                className="absolute inset-0 flex flex-col justify-center gap-35"
                style={{ 
                    transform: "rotate(-12deg) scale(1.5)",
                    transformOrigin: "center center"
                }}
            >
                {/* Top ribbon - moves left-down diagonally */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {repeatedWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-6xl font-black text-[#6366F1]/5 mx-8 select-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>

                {/* Second ribbon - moves right-up diagonally */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        duration: speed * 1.2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {repeatedWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-7xl font-black text-[#8B5CF6]/5 mx-8 select-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>

                {/* Third ribbon - moves left-down diagonally */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: speed * 0.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {repeatedWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-5xl font-black text-[#6366F1]/5 mx-8 select-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>

                {/* Fourth ribbon - moves right-up diagonally */}
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        duration: speed * 1.4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {repeatedWords.map((word, index) => (
                        <span
                            key={index}
                            className="text-6xl font-black text-[#8B5CF6]/5 mx-8 select-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
