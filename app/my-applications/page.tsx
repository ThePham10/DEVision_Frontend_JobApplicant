"use client"

import Header from "@/components/header/ui/header"
import JobApplicationList from "@/components/job-application/ui/ApplicationList"
import { useAuthStore } from "@/store/authStore"
import { motion } from "motion/react"
import { Briefcase, CheckCircle, XCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { getMyApplications } from "@/components/job-application/service/JobApplicationService"
import { JobApplicationStatus } from "@/components/job-application/types"

export default function MyApplicationsPage() {
    const { isAuthenticated } = useAuthStore()
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0
    })

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await getMyApplications(1, 100)
                const apps = response.data
                setStats({
                    total: apps.length,
                    pending: apps.filter(a => a.status === JobApplicationStatus.PENDING).length,
                    accepted: apps.filter(a => a.status === JobApplicationStatus.ACCEPTED).length,
                    rejected: apps.filter(a => a.status === JobApplicationStatus.REJECTED).length,
                })
            } catch (error) {
                console.error("Failed to load stats:", error)
            }
        }
        
        if (isAuthenticated) {
            loadStats()
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null
    }

    const statCards = [
        {
            label: "Total Applications",
            value: stats.total,
            icon: Briefcase,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50"
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            gradient: "from-amber-500 to-yellow-600",
            bgGradient: "from-amber-50 to-yellow-50"
        },
        {
            label: "Accepted",
            value: stats.accepted,
            icon: CheckCircle,
            gradient: "from-emerald-500 to-green-600",
            bgGradient: "from-emerald-50 to-green-50"
        },
        {
            label: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            gradient: "from-red-500 to-rose-600",
            bgGradient: "from-red-50 to-rose-50"
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Animated Page Header */}
                <motion.div
                    className="mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
                        My Job Applications
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Track the status of your job applications and stay updated on your career journey
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} border border-gray-200/50 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300`}
                        >
                            {/* Background gradient accent */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl rounded-full`} />
                            
                            <div className="relative">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Applications List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <JobApplicationList />
                </motion.div>
            </div>
        </div>
    )
}
