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
        formValues,
        formKey,
        jobPosts,
        totalCount,
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
        hasApplied,
        hasNextPage,
        isFetchingNextPage,
        handleLoadMore,
    } = useJobPostTable();

    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Filter Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-base sm:text-lg font-semibold mb-3 sm:mb-4">Filter Jobs</h2>
                <HeadlessForm 
                    key={formKey}
                    config={filterFormConfig} 
                    initialValues={formValues}
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
                        Showing {jobPosts.length} of {totalCount} results
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

                {/* Load More Button */}
                {!loading && !error && hasNextPage && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleLoadMore}
                            disabled={isFetchingNextPage}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isFetchingNextPage ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                `Load More (${totalCount - jobPosts.length} remaining)`
                            )}
                        </button>
                    </div>
                )}
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