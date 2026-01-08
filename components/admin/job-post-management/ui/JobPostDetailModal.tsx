import { MapPin, Briefcase, Calendar, DollarSign, Building } from "lucide-react";
import { JobPost } from "../types";

export const JobPostDetailModal = ({ job }: {job: JobPost}) => {
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
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === "PUBLIC"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}>
                        {job.status}
                    </span>
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
                        <p className="font-medium">{job.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Employment Type</p>
                        <p className="font-medium">{job.employmentType}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-medium">{job.salaryDisplay || "Not specified"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">Expires On</p>
                        <p className="font-medium">{formatDate(job.expireDate)}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Additional Employment Types */}
            {job.additionalEmploymentTypes && job.additionalEmploymentTypes.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Employment Types</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.additionalEmploymentTypes.map((type, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Meta Info */}
            <div className="text-xs text-gray-400 border-t pt-4">
                <p>Job ID: {job.jobId}</p>
                <p>Company ID: {job.companyId}</p>
                {job.postedDate && <p>Posted: {formatDate(job.postedDate)}</p>}
            </div>
        </div>
    )
}