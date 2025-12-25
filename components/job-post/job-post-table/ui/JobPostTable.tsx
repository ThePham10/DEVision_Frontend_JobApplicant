"use client";

import { Activity } from "react"
import Table from "@/components/headless-table/Table"
import JobPostCard from "../JobPostCard"
import { JobPostFilters, JobPost } from "../types"
import { HeadlessForm } from "@/components/headless-form/Form"
import { X } from "lucide-react"
import Modal from "@/components/reusable-component/Modal"
import JobPostDetail from "@/components/job-post/job-post-table/ui/JobPostDetail"
import { useJobPostTable } from "../hook/JobPostTableHook";


const JobPostTable = () => {
    const {
        filterFormConfig,
        jobApplicationFormConfig,
        filters,
        isOpen,
        isJobApplicationOpen,
        selectedJob,
        user,
        setIsOpen,
        setIsJobApplicationOpen,
        loadJobPostWithFilters,
        handleFilterSubmit,
        removeFilter,
        handleViewDetail,
        handleApply,
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
                    {filters.minSalary && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Min Salary: ${filters.minSalary.toLocaleString()}
                            <X
                                onClick={() => removeFilter('minSalary')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove salary filter"
                            />
                        </span>
                    )}
                </div>
            )}

            {/* Job Post Table */}
            <Table<JobPost, JobPostFilters>
                className="flex flex-col gap-5"
                title="Available Positions"
                CardComponent={JobPostCard}
                onViewDetail={handleViewDetail}
                onApply={handleApply}
                loadItemService={loadJobPostWithFilters}
                limit={10}
                showTotal={true}
                getItemId={(job) => job.id}
            />


            <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={selectedJob?.title}
                    size="large"
                >
                    <Activity mode={selectedJob ? "visible" : "hidden"}>
                        {selectedJob && (
                            <JobPostDetail job={selectedJob} />
                        )}
                    </Activity>
            </Modal>

            <Modal
                isOpen={isJobApplicationOpen}
                onClose={() => setIsJobApplicationOpen(false)}
                title="Job Application"
                size="large">
                <HeadlessForm
                    config={jobApplicationFormConfig}
                    onSubmit={() => console.log("Submmited")}
                    initialValues={
                        {
                            fullName: user?.name || "",
                            email: user?.email || "",
                        }
                    }
                />
            </Modal>
        </div>
    )
}

export default JobPostTable