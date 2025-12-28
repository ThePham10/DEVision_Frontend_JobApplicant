import { JobApplication, JobApplicationStatus } from "../types"
import { MapPinned, Calendar, Briefcase, Check, X, ClipboardClock, Folder} from "lucide-react"
import { motion } from "motion/react"

type JobApplicationCardProps = {
    item: JobApplication
    onClick?: (application: JobApplication) => void
}

/**
 * Get badge styling based on application status
 */
function getStatusBadgeProps(status: JobApplicationStatus): { 
    icon?: React.ReactNode
    text: string
    bgGradient: string
    textColor: string
    borderColor: string
} {
    switch (status) {
        case JobApplicationStatus.ACCEPTED:
            return {
                icon: <Check className="w-6 h-6 text-emerald-600" />,
                text: "Accepted",
                bgGradient: "bg-gradient-to-r from-emerald-50 to-green-50",
                textColor: "text-emerald-700",
                borderColor: "border-emerald-200"
            }
        case JobApplicationStatus.REJECTED:
            return {
                icon: <X className="w-6 h-6 text-red-600" />,
                text: "Rejected",
                bgGradient: "bg-gradient-to-r from-red-50 to-rose-50",
                textColor: "text-red-700",
                borderColor: "border-red-200"
            }
        case JobApplicationStatus.PENDING:
            return {
                icon: <ClipboardClock className="w-6 h-6 text-amber-600" />,
                text: "Pending",
                bgGradient: "bg-gradient-to-r from-amber-50 to-yellow-50",
                textColor: "text-amber-700",
                borderColor: "border-amber-200"
            }
        case JobApplicationStatus.ARCHIVED:
            return {
                icon: <Folder className="w-6 h-6 text-slate-600" />,
                text: "Archived",
                bgGradient: "bg-gradient-to-r from-slate-50 to-gray-50",
                textColor: "text-slate-700",
                borderColor: "border-slate-200"
            }
        default:
            return {
                text: status,
                bgGradient: "bg-gray-50",
                textColor: "text-gray-700",
                borderColor: "border-gray-200"
            }
    }
}

/**
 * Card component for displaying a single job application
 */
const JobApplicationCard = ({ item, onClick }: JobApplicationCardProps) => {
    const statusProps = getStatusBadgeProps(item.status)
    const appliedDate = new Date(item.appliedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ 
                y: -8, 
                transition: { duration: 0.2 } 
            }}
            className={`group relative flex flex-col gap-4 border border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-300 ${
                onClick ? "cursor-pointer" : ""
            }`}
            onClick={() => onClick?.(item)}
        >
            {/* Gradient accent on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:via-indigo-50/30 group-hover:to-purple-50/50 transition-all duration-500 -z-10" />
            
            {/* Header: Status Badge */}
            <div className="flex justify-end">
                <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border ${statusProps.borderColor} ${statusProps.bgGradient} backdrop-blur-sm`}>
                    <span>
                        {statusProps.icon}
                    </span>
                    <span className={`text-sm sm:text-base font-semibold ${statusProps.textColor}`}>
                        {statusProps.text}
                    </span>
                </div>
            </div>

            {/* Job Title & Company */}
            <div className="flex-1 min-w-0 -mt-2">
                <h3 className="font-[Inter] text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 line-clamp-2 group-hover:from-blue-900 group-hover:via-indigo-900 group-hover:to-purple-900 transition-all duration-300">
                    {item.jobTitle}
                </h3>
                <p className="font-[Inter] text-base sm:text-lg text-gray-600 font-medium">
                    {item.company}
                </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Info rows with icons */}
            <div className="flex flex-col gap-3 text-sm sm:text-base text-gray-600">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                        <MapPinned className="w-4 h-4" />
                    </div>
                    <span className="truncate font-medium">{item.location}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Applied on {appliedDate}</span>
                </div>
                {item.cvFileName && (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm truncate">{item.cvFileName}</span>
                    </div>
                )}
            </div>

            {/* Animated border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-xl" />
            </div>
        </motion.div>
    )
}

export default JobApplicationCard
