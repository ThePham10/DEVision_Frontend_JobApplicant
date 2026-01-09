"use client"

import JobApplicationCard from "./ApplicationCard"
import { useJobApplication } from "../hook/useJobApplication"
import { motion, AnimatePresence } from "motion/react"
import { Briefcase, Filter } from "lucide-react"
import { statusFilters } from "../types"
import { ApplicationFilterPillsBar } from "./ApplicationFilterPillsBar"

/**
 * Main list component for displaying job applications
 */
export const JobApplicationList = () => {
    const {         
        jobApplications,
        isLoading,
        handleFilterClick,
        filteredApplications,
        statCards,
        activeFilter,
        getCountForStatus
    } = useJobApplication()

    // Loading skeleton
    if (isLoading) {
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
    if (jobApplications.length === 0) {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
                    <div className="space-y-8">
                        {/* Enhanced Filter Pills */}
                        <ApplicationFilterPillsBar
                            activeFilter={activeFilter}
                            getCountForStatus={getCountForStatus}
                            handleFilterClick={handleFilterClick}
                        />

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
                                {filteredApplications.map((app, index) => (
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
                                Showing <span className="font-semibold text-gray-700">{filteredApplications.length}</span> {filteredApplications.length === 1 ? "application" : "applications"}
                                {activeFilter && (
                                    <span> • <span className="font-medium">{statusFilters.find(f => f.value === activeFilter)?.label}</span></span>
                                )}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div> 
    )
}
