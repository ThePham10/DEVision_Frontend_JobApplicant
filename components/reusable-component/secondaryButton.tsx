import { motion } from "motion/react";
import { useRouter } from "next/navigation"

export default function SecondaryButton({ text, onClick, style, destination }: { text: string; onClick?: React.MouseEventHandler<HTMLButtonElement>; style?: string; destination? : string }) {
    const router = useRouter();

    return (
        <motion.button
            className={`bg-white border border-solid border-[#e1e7ef] hover:border-[#2463eb] hover:text-[#2463eb] text-[#0f1729] px-6 py-3 rounded-md ${style}`}
            onClick={destination ? () => router.push(destination) : onClick}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(36, 99, 235, 0.2)" }}
            whileTap={{ scale: 0.95 }}
        >
            {text}
        </motion.button>
    );
}