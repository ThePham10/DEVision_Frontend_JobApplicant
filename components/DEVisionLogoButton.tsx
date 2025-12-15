"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import { motion } from "motion/react";

export const DEVisionLogoButton = () => {
    const router = useRouter();

    return (
        <motion.button className="flex items-center"
                onClick={() => router.push('/')}
                whileHover={{scale: 1.05} }
                whileTap = {{scale: 0.95}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div>
                <Image src="/DEVision_JA_Logo.svg" width={40} height={40} alt="DEVision logo"/>
            </div>

            <div className="flex font-bold text-2xl">
                DEVision
            </div>

        </motion.button>
    )
}