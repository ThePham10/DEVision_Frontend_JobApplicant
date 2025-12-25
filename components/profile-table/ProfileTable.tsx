"use client";

import { motion } from "motion/react";
import AvatarBox from "./profile-box/avatar-box/ui/AvatarBox";
import ProfileSkillBox from "./profile-box/skill-box/ui/ProfileSkillBox";
import ProfileEducationBox from "./profile-box/education-box/ui/ProfileEducationBox";
import ProfileWorkExpBox from "./profile-box/work-experience-box/ui/ProfileWorkExpBox";
import SummaryBox from "./profile-box/summary-box/ui/SummaryBox";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
};

export const ProfileTable = () => {
    return (
        <motion.div 
            className="flex flex-col gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <AvatarBox />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <SummaryBox />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ProfileSkillBox />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ProfileEducationBox />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ProfileWorkExpBox />
            </motion.div>
        </motion.div>
    )
}