"use client"

import JobApplicationCard from "./ApplicationCard"
import { useJobApplication } from "../hook/useJobApplication"
import { motion, AnimatePresence } from "motion/react"
import { Briefcase, Filter } from "lucide-react"
import { statusFilters } from "../types"
import { ApplicationFilterPillsBar } from "./ApplicationFilterPillsBar"

/**
 * Job application list component
 */
export const JobApplicationList = () => {
    const {         
        jobApplications,
        isLoading,
        handleFilterClick,
        filteredApplications,
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Animated Page Header - Same as populated state */}
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

                    {/* Filter Pills Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8"
                    >
                        <ApplicationFilterPillsBar
                            activeFilter={activeFilter}
                            getCountForStatus={getCountForStatus}
                            handleFilterClick={handleFilterClick}
                        />
                    </motion.div>

                    {/* Empty State Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg p-8 sm:p-12"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-pink-100 opacity-40 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative text-center py-8 sm:py-12">
                            {/* Icon with animated ring */}
                            <div className="relative inline-flex items-center justify-center mb-8">
                                <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 animate-pulse" />
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                    <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                </div>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                No applications found
                            </h3>
                            <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto mb-8">
                                {activeFilter 
                                    ? "Try selecting a different filter to view other applications" 
                                    : "You haven't applied to any jobs yet. Start exploring opportunities and take the first step in your career journey!"}
                            </p>
                            
                            {/* Call to Action Button */}
                            {!activeFilter && (
                                <motion.a
                                    href="/jobs"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Briefcase className="w-5 h-5" />
                                    Browse Jobs
                                </motion.a>
                            )}
                            
                            {activeFilter && (
                                <motion.button
                                    onClick={() => handleFilterClick(undefined)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300"
                                >
                                    <Filter className="w-4 h-4" />
                                    Clear Filter
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </div>
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
