import { MapPin, Briefcase, Calendar, DollarSign, Building } from "lucide-react";
import { JobPost } from "../types";

export const JobPostDetailModal = ({ job }: {job: JobPost}) => {
    // Format salary display from criteria
    const salaryDisplay = `${job.criteria.salaryRange.min.toLocaleString()} - ${job.criteria.salaryRange.max.toLocaleString()} ${job.criteria.salaryCurrency}`;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-start gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 font-[Inter]">
                        {job.title}
                    </h2>
                </div>
                {job.companyName && (
                    <p className="text-gray-600 font-[Inter] flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {job.companyName}
                    </p>
                )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium">{job.criteria.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Employment Type</p>
                        <p className="font-medium">{job.criteria.employmentType}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-medium">{salaryDisplay}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Expires On</p>
                        <p className="font-medium">{formatDate(job.expiresAt)}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Skills */}
            {job.criteria.requiredSkillIds && job.criteria.requiredSkillIds.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.criteria.requiredSkillIds.map((skillId, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                            >
                                {skillId}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Fresher Friendly Badge */}
            {job.criteria.isFresherFriendly && (
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        Fresher Friendly
                    </span>
                </div>
            )}

            {/* Meta Info */}
            <div className="text-xs text-gray-400 border-t pt-4">
                <p>Job ID: {job.jobId}</p>
                <p>Company ID: {job.companyId}</p>
                {job.postedAt && <p>Posted: {formatDate(job.postedAt)}</p>}
            </div>
        </div>
    )
}