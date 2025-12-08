import { motion } from "motion/react";

export default function Button({ text, onClick, style}: { text: string; onClick: any; style? : string}) {
    return (
        <motion.button
            className={`bg-[#2463eb] hover:bg-[#2362ebe6] text-white px-6 py-3 rounded-md ${style}`}
            onClick={onClick}
            whileHover={{ scale: 1.05, boxShadow: "..." }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {text}
        </motion.button>
    );
}