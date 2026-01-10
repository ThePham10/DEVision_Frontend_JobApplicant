import { motion } from "motion/react"
import { Filter } from "lucide-react"
import { JobApplicationStatus, statusFilters } from "../types"

interface ApplicationFilterPillsBarProps {
    activeFilter: JobApplicationStatus | undefined
    getCountForStatus: (status: JobApplicationStatus | undefined) => number
    handleFilterClick: (status: JobApplicationStatus | undefined) => void
}

export const ApplicationFilterPillsBar = ({ getCountForStatus, activeFilter, handleFilterClick }: ApplicationFilterPillsBarProps) => {
    return (
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
                    })
                }
            </div>
        </motion.div>
    )
}