
import { useState, useCallback } from "react"
import { loadJobPost } from "../service/JobPostTableService"
import { JobPostFilters, PaginatedResponse, JobPost } from "../types"
import { useAuthStore } from "@/store/authStore";
import type { FormConfig } from "@/components/headless-form/types/types"

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

const useJobPostTable = () => {
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

    return {
        employmentType,
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
    }
}

export { useJobPostTable }