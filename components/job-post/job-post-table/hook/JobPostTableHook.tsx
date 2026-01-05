"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { JobPostFilters, JobPost } from "../../types"
import type { FormConfig } from "@/components/headless-form"
import { loadJobPost } from "../service/JobPostTableService"

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
            type: "dual-range", 
            placeholder: "Select salary range",
            min: 0,
            max: 200000,
            step: 1000,
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

const useJobPostTable = () => {
    const router = useRouter()
    
    // State for job posts and UI
    const [jobPosts, setJobPosts] = useState<JobPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<JobPostFilters>({})
    const [isOpen, setIsOpen] = useState(false)
    const [isJobApplicationOpen, setIsJobApplicationOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null)
    
    // Fetch job posts whenever filters change
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                setError(null)
                const jobs = await loadJobPost(filters)
                setJobPosts(jobs)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load job posts')
            } finally {
                setLoading(false)
            }
        }
        
        fetchJobs()
    }, [filters])
    
    // Handle filter form submission
    const handleFilterSubmit = (formData: Record<string, unknown>) => {
        const newFilters: JobPostFilters = {
            jobTitle: formData.jobTitle as string || undefined,
            location: formData.location as string || undefined,
            employmentType: employmentType.find((type) => type.id === formData.employmentType)?.value || undefined,
            // Dual-range slider creates {name}_min and {name}_max fields
            minSalary: formData.salaryRange_min ? Number(formData.salaryRange_min) : undefined,
            maxSalary: formData.salaryRange_max ? Number(formData.salaryRange_max) : undefined,
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
        router.push(`/jobs/${post.jobId}`)
    }

    const handleApply = (post: JobPost) => {
        console.log(post)
        setSelectedJob(post)
        setIsJobApplicationOpen(true)
    }

    return {
        employmentType,
        filterFormConfig,
        filters,
        jobPosts,
        loading,
        error,
        isOpen,
        isJobApplicationOpen,
        selectedJob,
        setIsOpen,
        setIsJobApplicationOpen,
        handleFilterSubmit,
        removeFilter,
        handleViewDetail,
        handleApply,
    }
}

export { useJobPostTable }