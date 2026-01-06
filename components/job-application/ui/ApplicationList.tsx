"use client"

import { useState, useEffect } from "react"
import JobApplicationCard from "./ApplicationCard"
import { useJobApplication } from "../hook/useJobApplication"
import { JobApplicationStatus, JobApplication } from "../types"
import { motion, AnimatePresence } from "motion/react"
import { Briefcase, Filter } from "lucide-react"

/**
 * Status filter tabs
 */
const statusFilters = [
    { label: "All Applications", value: undefined, gradient: "from-slate-600 to-slate-700" },
    { label: "Pending", value: JobApplicationStatus.PENDING, gradient: "from-amber-500 to-yellow-600" },
    { label: "Accepted", value: JobApplicationStatus.ACCEPTED, gradient: "from-emerald-500 to-green-600" },
    { label: "Rejected", value: JobApplicationStatus.REJECTED, gradient: "from-red-500 to-rose-600" },
    { label: "Archived", value: JobApplicationStatus.ARCHIVED, gradient: "from-gray-500 to-slate-600" },
]

/**
 * Main list component for displaying job applications
 */
export const JobApplicationList = () => {
    const { filters, loadApplicationsWithFilters, filterByStatus } = useJobApplication()
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [allApplications, setAllApplications] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<JobApplicationStatus | undefined>(undefined)

    // Load all applications initially and when filters change
    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true)
            try {
                const response = await loadApplicationsWithFilters(1, 100)
                setAllApplications(response.data)
                setApplications(response.data)
            } catch (error) {
                console.error("Failed to load applications:", error)
            } finally {
                setLoading(false)
            }
        }

        loadAllData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])



    const handleFilterClick = (status: JobApplicationStatus | undefined) => {
        setActiveFilter(status)
        filterByStatus(status)
    }

    // Calculate counts for each status
    const getCountForStatus = (status: JobApplicationStatus | undefined) => {
        if (status === undefined) return allApplications.length
        return allApplications.filter(app => app.status === status).length
    }

    // Loading skeleton
    if (loading) {
        return (
            <div className="space-y-6">
                {/* Filter skeleton */}
                <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-11 w-32 bg-gray-200 rounded-xl animate-pulse" />
                    ))}
                </div>
                
                {/* Cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="border border-gray-200 bg-white p-5 sm:p-6 rounded-2xl animate-pulse"
                        >
                            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Empty state
    if (applications.length === 0) {
        return (
            <div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2 text-gray-600">
                        <Filter className="w-5 h-5" />
                        <span className="font-medium text-sm">Filter by status</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {statusFilters.map((filter) => {
                            const isActive = activeFilter === filter.value
                            const count = getCountForStatus(filter.value)
                            
                            return (
                                <motion.button
                                    key={filter.label}
                                    onClick={() => handleFilterClick(filter.value)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`group relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg`
                                            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {filter.label}
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                            isActive 
                                                ? "bg-white/25 text-white" 
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                            {count}
                                        </span>
                                    </span>
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 mb-6">
                        <Briefcase className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No applications found</h3>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        {activeFilter 
                            ? "Try selecting a different filter to view other applications" 
                            : "You haven't applied to any jobs yet. Start exploring opportunities!"}
                    </p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Enhanced Filter Pills */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="w-5 h-5" />
                    <span className="font-medium text-sm">Filter by status</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {statusFilters.map((filter) => {
                        const isActive = activeFilter === filter.value
                        const count = getCountForStatus(filter.value)
                        
                        return (
                            <motion.button
                                key={filter.label}
                                onClick={() => handleFilterClick(filter.value)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`group relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    isActive
                                        ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg`
                                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    {filter.label}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        isActive 
                                            ? "bg-white/25 text-white" 
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                        {count}
                                    </span>
                                </span>
                            </motion.button>
                        )
                    })}
                </div>
            </motion.div>

            {/* Applications grid with stagger animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter ?? "all"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                >
                    {applications.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <JobApplicationCard item={app} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Results summary */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-4"
            >
                <p className="text-gray-500 text-sm">
                    Showing <span className="font-semibold text-gray-700">{applications.length}</span> {applications.length === 1 ? "application" : "applications"}
                    {activeFilter && (
                        <span> • <span className="font-medium">{statusFilters.find(f => f.value === activeFilter)?.label}</span></span>
                    )}
                </p>
            </motion.div>
        </div>
    )
}
