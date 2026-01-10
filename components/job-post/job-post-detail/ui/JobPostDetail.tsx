
import { Button, SecondaryButton } from "@/components/reusable-component"
import {ApplicationModal} from "@/components/job-application/ui/ApplicationModal"
import { motion } from "motion/react"
import { MapPinned, DollarSign, Calendar, Building, CheckCircle } from "lucide-react"
import { useJobPostDetail } from "../hook/JobPostDetailHook"
import { icons } from "@/components/reusable-component"

export const JobPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const {
        router,
        jobPost,
        isLoading,
        isModalOpen,
        isAuthenticated,
        setIsModalOpen,
        hasApplied,
        getSkillIcon,
        getSkillName
    } = useJobPostDetail({ params });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-40 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!jobPost) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
                >
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
                                {jobPost.title}
                            </h1>
                            <p className="text-xl text-gray-600 font-medium flex items-center gap-2">
                                <Building className="w-5 h-5" />
                                {jobPost.companyName}
                            </p>
                        </div>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {jobPost.employmentType}
                        </span>
                    </div>

                    {/* Job Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <MapPinned className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-gray-700">{jobPost.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700">{jobPost.salaryDisplay}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-gray-700">Posted {new Date(jobPost.postedDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                            {isAuthenticated && (
                                hasApplied(jobPost.jobId) ? (
                                    <button
                                        disabled
                                        className="flex-1 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Already Applied
                                    </button>
                                ) : (
                                    <Button
                                        text="Apply for this Position"
                                        onClick={() => setIsModalOpen(true)}
                                        style="flex-1"
                                    />
                                )
                            )}
                            <SecondaryButton
                                text="Back to Jobs"
                                onClick={() => router.push("/jobs")}
                                style={isAuthenticated ? "flex-1 sm:flex-none" : "w-full"}
                            />
                        </div>
                </motion.div>

                {/* Job Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    {/* Skills */}
                    {jobPost.skills.length > 0 && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {jobPost.skills.slice(0, 5).map((skillId, index) => {
                                    const iconKey = getSkillIcon(skillId);
                                    const IconComponent = iconKey ? icons[iconKey] : null;
                                    return (
                                        <span 
                                            key={index} 
                                            className="h-9 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                        >
                                            {IconComponent && <IconComponent className="w-3 h-3" />}
                                            {getSkillName(skillId)}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed">{jobPost.description}</p>
                    </div>

                </motion.div>
            </div>

            {/* Application Modal */}
            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobId={jobPost.jobId}
                jobTitle={jobPost.title}
                company={jobPost.companyName}
            />
        </div>
    )
}