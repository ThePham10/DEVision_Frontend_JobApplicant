"use client";

import { JobPost } from "../types";
import { motion } from "motion/react";
import { Trash2, MapPin, Briefcase, Calendar, DollarSign, Eye, Globe, HatGlasses } from "lucide-react";
import { useSkillLookup } from "@/components/shared/hooks/useSkillLookup";

type JobPostCardProps = {
    job: JobPost;
    onViewDetail: (job: JobPost) => void;
    onDelete: (job: JobPost) => void;
};

export default function JobPostCard({ job, onViewDetail, onDelete }: JobPostCardProps) {
    const { getSkillName } = useSkillLookup();

     const getStatusColor = (status: string) => {
        switch (status) {
            case "PUBLIC":
                return "bg-green-100 text-green-700";
            case "PRIVATE":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PUBLIC":
                return <Globe />;
            case "PRIVATE":
                return <HatGlasses />;
            default:
                return <Eye />;
        }
    }


    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow"
        >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-start gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 font-[Inter] truncate">
                            {job.title}
                        </h3>
                        <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}{job.status}
                        </span>
                    </div>

                    {/* Company */}
                    {job.companyName && (
                        <p className="text-sm text-gray-600 font-[Inter] mb-2">
                            {job.companyName}
                        </p>
                    )}

                    {/* Details Row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.employmentType}
                        </span>
                        <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salaryDisplay}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Expires: {formatDate(job.expireDate)}
                        </span>
                    </div>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {job.skills.slice(0, 5).map((skillId, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                                >
                                    {getSkillName(skillId)}
                                </span>
                            ))}
                            {job.skills.length > 5 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                    +{job.skills.length - 5} more
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-start">
                    <motion.button
                        onClick={() => onViewDetail(job)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View details"
                    >
                        <Eye size={20} />
                    </motion.button>
                    
                    <motion.button
                        onClick={() => onDelete(job)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Delete job post"
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
