import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { ChevronRight } from "lucide-react";

type InfoCardProps = {
    title: string;
    description?: string;
    className?: string;
    onClick?: () => void;
    variant?: "default" | "danger";
    Icon?: IconType;
}

export const InfoCard = ({ 
    title, 
    description, 
    className = "", 
    onClick, 
    variant = "default",
    Icon
}: InfoCardProps) => {
    const isDanger = variant === "danger";
    
    return (
        <motion.div
            className={`
                group relative overflow-hidden
                rounded-xl p-4 
                ${isDanger 
                    ? "bg-gradient-to-br from-red-500 to-rose-600 text-white" 
                    : "bg-white/90 backdrop-blur-sm border border-white/50"
                }
                shadow-md hover:shadow-xl
                transition-all duration-300
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={onClick ? { scale: 1.02, y: -2 } : undefined}
            whileTap={onClick ? { scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
        >
            {/* Gradient overlay on hover for non-danger variant */}
            {!isDanger && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            
            {/* Shimmer effect on hover */}
            <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r ${isDanger ? "from-transparent via-white/10 to-transparent" : "from-transparent via-blue-500/5 to-transparent"}`} />
            
            <div className="relative z-10 flex items-center gap-3">
                {/* Optional Icon */}
                {Icon && (
                    <div className={`
                        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                        ${isDanger 
                            ? "bg-white/20" 
                            : "bg-gradient-to-br from-blue-500 to-indigo-600"
                        }
                        group-hover:scale-110 transition-transform duration-300
                    `}>
                        <Icon className={`w-5 h-5 ${isDanger ? "text-white" : "text-white"}`} />
                    </div>
                )}
                
                <div className={`flex-1 ${Icon ? "text-left" : "text-center"}`}>
                    <h3 className={`
                        text-sm font-semibold mb-0.5
                        ${isDanger 
                            ? "text-white" 
                            : "text-gray-900 group-hover:text-blue-700"
                        }
                        transition-colors duration-200
                    `}>
                        {title}
                    </h3>
                    {description && (
                        <p className={`
                            text-xs leading-relaxed
                            ${isDanger ? "text-white/80" : "text-gray-500"}
                        `}>
                            {description}
                        </p>
                    )}
                </div>
                
                {/* Arrow indicator for clickable cards */}
                {onClick && (
                    <motion.div 
                        className={`
                            flex-shrink-0 opacity-0 group-hover:opacity-100
                            transition-opacity duration-200
                            ${isDanger ? "text-white/70" : "text-blue-500"}
                        `}
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                    >
                        <ChevronRight />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}