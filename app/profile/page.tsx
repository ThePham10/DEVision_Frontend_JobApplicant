"use client";

import { ProfileTable } from "@/components/profile-table";
import { useAuthStore } from "@/store/authStore";
import { motion } from "motion/react";

export default function Page() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) return null;
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {isAuthenticated && 
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Animated Page Header */}
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                            Profile Management
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage your professional profile and showcase your skills
                        </p>
                    </motion.div>
                    
                    <ProfileTable />
                </div>
            }
        </div>
    )
}