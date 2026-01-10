"use client";

import JobPostCard from "../JobPostCard"
import { HeadlessForm } from "@/components/headless-form"
import { X } from "lucide-react"
import { useJobPostTable } from "../hook/JobPostTableHook";
import { ApplicationModal } from "@/components/job-application";


export const JobPostTable = () => {
    const {
        filterFormConfig,
        filters,
        jobPosts,
        loading,
        error,
        isJobApplicationOpen,
        selectedJob,
        isAuthenticated,
        setIsJobApplicationOpen,
        handleFilterSubmit,
        removeFilter,
        handleViewDetail,
        handleApply,
        hasApplied
    } = useJobPostTable();

    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Filter Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-base sm:text-lg font-semibold mb-3 sm:mb-4">Filter Jobs</h2>
                <HeadlessForm 
                    config={filterFormConfig} 
                    onSubmit={handleFilterSubmit}
                />
            </div>
            
            {/* Active Filters Display */}
            {Object.keys(filters).length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {filters.jobTitle && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Title: {filters.jobTitle}
                            <X 
                                onClick={() => removeFilter('jobTitle')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove job title filter"
                            />
                        </span>
                    )}
                    {filters.location && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Location: {filters.location}
                            <X
                                onClick={() => removeFilter('location')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove location filter"
                            />
                        </span>
                    )}
                    {filters.employmentType && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Type: {filters.employmentType}
                            <X 
                                onClick={() => removeFilter('employmentType')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove employment type filter"
                            />
                        </span>
                    )}
                    {(filters.minSalary || filters.maxSalary) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Salary: ${filters.minSalary?.toLocaleString() ?? '0'} - ${filters.maxSalary?.toLocaleString() ?? '∞'}
                            <X
                                onClick={() => {
                                    removeFilter('minSalary');
                                    removeFilter('maxSalary');
                                }}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove salary filter"
                            />
                        </span>
                    )}
                </div>
            )}

            {/* Job Post List */}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-2xl font-bold">Available Positions</div>
                    <div className="text-sm text-gray-500">
                        Showing {jobPosts.length} results
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-8">Loading job posts...</div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {!loading && !error && jobPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No job posts found</div>
                )}

                {!loading && !error && jobPosts.map((job) => (
                    <JobPostCard
                        key={job.jobId}
                        item={job}
                        onViewDetail={handleViewDetail}
                        onApply={handleApply}
                        isApplied={hasApplied(job.jobId)}
                        isAuthenticated={isAuthenticated}
                    />
                ))}
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <ApplicationModal
                    isOpen={isJobApplicationOpen}
                    onClose={() => setIsJobApplicationOpen(false)}
                    jobId={String(selectedJob?.jobId)}
                    jobTitle={selectedJob?.title}
                    company={selectedJob?.companyName as string}
                />
            )}
        </div>
    )
}