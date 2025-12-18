import { motion } from "motion/react";

type InfoCardProps = {
    title: string;
    description?: string;
    className?: string;
    onClick?: () => void;
    backgroundColor?: string;
    textColor?: string;
}

export default function InfoCard({ title, description, className = "", onClick, backgroundColor = "bg-white", textColor = "text-[#0F1729]" }: InfoCardProps) {
    return (
        <motion.div
            className={`rounded-lg border border-[#E1E7EF] ${backgroundColor} p-4 shadow-sm text-center ${onClick ? "cursor-pointer hover:shadow-md" : ""} ${className}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={onClick ? { scale: 1.02 } : undefined}
            whileTap={onClick ? { scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={onClick}
        >
            <h3 className={`${textColor} text-sm font-semibold mb-1`}>{title}</h3>
            {description && <p className="text-[#4B5563] text-sm leading-5">{description}</p>}
        </motion.div>
    );
}