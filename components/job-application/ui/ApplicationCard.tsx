"use client"

import { JobApplication, JobApplicationStatus } from "../types"
import { MapPinned, Calendar, FileText, Building2, Clock, Archive } from "lucide-react"
import { motion } from "motion/react"

type JobApplicationCardProps = {
    item: JobApplication
}

/**
 * Status configuration with styling and metadata
 */
const STATUS_CONFIG: Record<JobApplicationStatus, {
    icon: React.ReactNode
    label: string
    colors: {
        bg: string
        text: string
        border: string
        iconBg: string
    }
}> = {
    [JobApplicationStatus.PENDING]: {
        icon: <Clock className="w-4 h-4" />,
        label: "Pending Review",
        colors: {
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
            iconBg: "bg-amber-100"
        }
    },
    [JobApplicationStatus.ARCHIVED]: {
        icon: <Archive className="w-4 h-4" />,
        label: "Archived",
        colors: {
            bg: "bg-slate-50",
            text: "text-slate-600",
            border: "border-slate-200",
            iconBg: "bg-slate-100"
        }
    }
}

/**
 * Format date to relative or absolute format
 */
function formatAppliedDate(date: Date): { relative: string; absolute: string } {
    const now = new Date()
    const applied = new Date(date)
    const diffInDays = Math.floor((now.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24))
    
    const absolute = applied.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
    
    if (diffInDays === 0) return { relative: "Today", absolute }
    if (diffInDays === 1) return { relative: "Yesterday", absolute }
    if (diffInDays < 7) return { relative: `${diffInDays} days ago`, absolute }
    if (diffInDays < 30) return { relative: `${Math.floor(diffInDays / 7)} weeks ago`, absolute }
    
    return { relative: absolute, absolute }
}

const getDocumentLabel = (url: string): string => {
    if (url.includes("/cv/")) return "View Resume"
    if (url.includes("/cover-letter/")) return "View Cover Letter"
    return "View Document"
}

/**
 * Card component for displaying a single job application
 */
const JobApplicationCard = ({ item }: JobApplicationCardProps) => {
    const status = STATUS_CONFIG[item.status] || STATUS_CONFIG[JobApplicationStatus.PENDING]
    const { relative: relativeDate, absolute: absoluteDate } = formatAppliedDate(item.appliedAt)

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className={`
                group relative bg-white rounded-2xl border border-gray-200
                shadow-sm hover:shadow-lg hover:border-gray-300
                overflow-hidden`}
        >
            {/* Status Bar - Top accent */}
            <div className={`h-1 ${status.colors.bg.replace('50', '400')}`} />
            
            <div className="p-5 sm:p-6">
                {/* Header: Title + Status */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                            {item.jobTitle}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium truncate">{item.company}</span>
                        </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full
                        ${status.colors.bg} ${status.colors.border} border
                        flex-shrink-0
                    `}>
                        <span className={status.colors.text}>{status.icon}</span>
                        <span className={`text-xs sm:text-sm font-semibold ${status.colors.text}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {/* Location */}
                    <div className="flex items-center gap-2.5 text-gray-600">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex-shrink-0">
                            <MapPinned className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.location}</span>
                    </div>
                    
                    {/* Applied Date */}
                    <div className="flex items-center gap-2.5 text-gray-600">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex-shrink-0">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span title={absoluteDate}>{relativeDate}</span>
                    </div>
                </div>

                {/* Documents Section - Only show if has attachments */}
                {item.mediaUrls && item.mediaUrls.length > 0 && (
                    <>
                        <div className="my-4 h-px bg-gray-100" />
                        <div className="flex items-start gap-2.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex-shrink-0">
                                <FileText className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs text-gray-400 block mb-2">Attached Documents</span>
                                <div className="flex flex-wrap gap-2">
                                    {item.mediaUrls.map((url, index) => (
                                        <a 
                                            href={url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            key={index} 
                                            className="
                                                inline-flex items-center gap-2 px-3 py-1.5
                                                bg-gradient-to-r from-blue-50 to-indigo-50
                                                border border-blue-200 rounded-full
                                                text-sm font-medium text-blue-700
                                                hover:from-blue-100 hover:to-indigo-100
                                                hover:border-blue-300 hover:text-blue-800
                                                transition-all duration-200
                                                group/doc
                                            "
                                        >
                                            <FileText className="w-3.5 h-3.5 group-hover/doc:scale-110 transition-transform" />
                                            <span>{getDocumentLabel(url)}</span>
                                            <svg 
                                                className="w-3.5 h-3.5 opacity-60 group-hover/doc:opacity-100 group-hover/doc:translate-x-0.5 transition-all" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    )
}

export default JobApplicationCard
