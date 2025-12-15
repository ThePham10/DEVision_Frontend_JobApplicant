import { motion } from "motion/react";
import type { IconType } from "react-icons"

type ServiceCardProps = {
    title: string;
    description: string;
    Icon: IconType;
}

export default function ServiceCard({ title, description, Icon}: ServiceCardProps) {
    return (
        <motion.div
            className="h-auto min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[260px] group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden flex items-center"
            whileHover={{ scale: 1.02, y: -5 }}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                {/* Icon with gradient background */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}