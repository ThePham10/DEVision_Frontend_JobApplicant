"use client";

import { useState, useCallback } from "react"
import Table from "@/components/headless-table/Table"
import JobPostCard from "../JobPostCard"
import { loadJobPost } from "../service/JobPostTableService"
import { JobPostFilters, PaginatedResponse, JobPost } from "../types"
import { HeadlessForm } from "@/components/headless-form/Form"
import type { FormConfig } from "@/components/headless-form/types/types"
import { FaTimes } from "react-icons/fa"

// Filter form configuration
const filterFormConfig: FormConfig = {
    children: [
        { 
            name: "jobTitle", 
            title: "Job Title", 
            type: "text", 
            placeholder: "Software Engineer", 
            colSpan: 1 
        },
        { 
            name: "location", 
            title: "Location", 
            type: "text", 
            placeholder: "Ho Chi Minh", 
            colSpan: 1 
        },
        { 
            name: "employmentType", 
            title: "Employment Type", 
            type: "select", 
            placeholder: "Select employment type",
            options: [
                { label: "All Types", value: "" },
                { label: "Full-time", value: "full-time" },
                { label: "Part-time", value: "part-time" },
                { label: "Contract", value: "contract" },
                { label: "Internship", value: "internship" },
            ],
            colSpan: 1 
        },
        {
            name: "salaryRange", 
            title: "Salary Range", 
            type: "range", 
            placeholder: "Select salary range",
            colSpan: 1,
            min: 0,
            max: 10000,
            step: 100,
        }
    ],
    buttonText: "Search Jobs",
    layout: {
        type: "grid",
        columns: 4,
        gap: "6",
    },
    buttonClassName: "col-span-4",
}

const JobPostTable = () => {
    // State for filters
    const [filters, setFilters] = useState<JobPostFilters>({})
    
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
            employmentType: formData.employmentType as string || undefined,
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

    return (
        <div className="flex flex-col gap-6">
            {/* Filter Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-lg font-semibold mb-4">Filter Jobs</h2>
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
                            <FaTimes 
                                onClick={() => removeFilter('jobTitle')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove job title filter"
                            />
                        </span>
                    )}
                    {filters.location && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Location: {filters.location}
                            <FaTimes
                                onClick={() => removeFilter('location')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove location filter"
                            />
                        </span>
                    )}
                    {filters.employmentType && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Type: {filters.employmentType}
                            <FaTimes 
                                onClick={() => removeFilter('employmentType')}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                aria-label="Remove employment type filter"
                            />
                        </span>
                    )}
                    {filters.minSalary && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Min Salary: ${filters.minSalary.toLocaleString()}
                            <FaTimes
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
                loadItemService={loadJobPostWithFilters}
                limit={10}
                showTotal={true}
                getItemId={(job) => job.id}
            />
        </div>
    )
}

export default JobPostTable