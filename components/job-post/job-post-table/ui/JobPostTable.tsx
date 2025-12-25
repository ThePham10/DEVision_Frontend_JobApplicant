"use client";

import { useState, useCallback, Activity } from "react"
import Table from "@/components/headless-table/Table"
import JobPostCard from "../JobPostCard"
import { loadJobPost } from "../service/JobPostTableService"
import { JobPostFilters, PaginatedResponse, JobPost } from "../types"
import { HeadlessForm } from "@/components/headless-form/Form"
import type { FormConfig } from "@/components/headless-form/types/types"
import { X } from "lucide-react"
import Modal from "@/components/reusable-component/Modal"
import JobPostDetail from "@/components/job-post/job-post-table/ui/JobPostDetail"
import { useAuthStore } from "@/store/authStore";

const employmentType = [
    { id: "1", name: "All Types", value: "", icon: "briefcase-business" },
    { id: "2", name: "Full-time", value: "full-time", icon: "briefcase-business" },
    { id: "3", name: "Part-time", value: "part-time", icon: "briefcase-business" },
    { id: "4", name: "Contract", value: "contract", icon: "briefcase-business" },
    { id: "5", name: "Internship", value: "internship", icon: "briefcase-business" },
]

// Filter form configuration - uses flex layout for better responsiveness
const filterFormConfig: FormConfig = {
    children: [
        { 
            name: "jobTitle", 
            title: "Job Title", 
            type: "text", 
            placeholder: "Software Engineer", 
        },
        { 
            name: "location", 
            title: "Location", 
            type: "text", 
            placeholder: "Ho Chi Minh", 
        },
        { 
            name: "employmentType", 
            title: "Employment Type", 
            type: "select", 
            placeholder: "Select employment type",
            options: employmentType,
        },
        {
            name: "salaryRange", 
            title: "Salary Range", 
            type: "range", 
            placeholder: "Select salary range",
            min: 0,
            max: 10000,
            step: 100,
        }
    ],
    buttonText: "Search Jobs",
    layout: {
        type: "flex",
        direction: "column",
        gap: "4",
    },
    formClassName: "w-full",
}

const jobApplicationFormConfig : FormConfig = {
    children: [
        {
            title: "Full Name",
            name: "fullName",
            type: "text",
            placeholder: "Enter your full name",
        },
        {
            title: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
        },
        {
            title: "Phone Number",
            name: "phoneNumber",
            type: "text",
            placeholder: "Enter your phone number",
        },
        {
            title: "Cover Letter",
            name: "coverLetter",
            type: "file",
            placeholder: "Upload your cover letter",
        },
    ],
    buttonText: "Submit Application",
    layout: {
        type: "flex",
        direction: "column",
        gap: "4",
    },
    formClassName: "w-full",
}

const JobPostTable = () => {
    // State for filters
    const [filters, setFilters] = useState<JobPostFilters>({})
    const [ isOpen, setIsOpen] = useState(false)
    const [ isJobApplicationOpen, setIsJobApplicationOpen] = useState(false)
    const [ selectedJob, setSelectedJob ] = useState<JobPost | null>(null)
    const { user } = useAuthStore();
    
    // Create a service function that includes current filters
    const loadJobPostWithFilters = useCallback(
        (page: number, limit: number): Promise<PaginatedResponse<JobPost>> => {
            return loadJobPost(page, limit, filters)
        },
        [filters]
    )
    
    // Handle filter form submission
    const handleFilterSubmit = (formData: Record<string, unknown>) => {
        const newFilters: JobPostFilters = {
            jobTitle: formData.jobTitle as string || undefined,
            location: formData.location as string || undefined,
            employmentType: employmentType.find((type) => type.id === formData.employmentType)?.value || undefined,
            minSalary: formData.salaryRange ? Number(formData.salaryRange) : undefined,
        }
        
        // Remove undefined/empty values
        const cleanFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([, value]) => value !== undefined && value !== "")
        ) as JobPostFilters
        
        setFilters(cleanFilters)
    }
    
    // Remove a single filter
    const removeFilter = (key: keyof JobPostFilters) => {
        setFilters(prev => {
            const newFilters = { ...prev }
            delete newFilters[key]
            return newFilters
        })
    }

    const handleViewDetail = (post: JobPost) => {
        console.log(post)
        setSelectedJob(post)
        setIsOpen(true)
    }

    const handleApply = (post: JobPost) => {
        console.log(post)
        setSelectedJob(post)
        setIsJobApplicationOpen(true)
    }

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