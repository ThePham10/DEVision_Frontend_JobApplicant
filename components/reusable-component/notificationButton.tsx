"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PopUpBox } from "@/components/popUpBox/popUpBox";

export const NotificationButton = () => {
    
    const trigger = (
        <motion.button
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div>
                <Image src="/notification.png" width={30} height={30} alt="Notification icon" />
            </div>

        </motion.button>
    );

    return <PopUpBox trigger={trigger} content={null} />;
};