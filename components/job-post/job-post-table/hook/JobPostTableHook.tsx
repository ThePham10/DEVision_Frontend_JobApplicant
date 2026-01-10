"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { JobPostFilters, JobPost } from "../../types"
import type { FormConfig } from "@/components/headless-form"
import { loadJobPost } from "../service/JobPostTableService"
import { useQuery } from "@tanstack/react-query"
import { getJobApplication } from "@/components/job-application/service/JobApplicationService"
import { useAuthStore } from "@/store"

const employmentType = [
    { id: "1", name: "All Types", value: "", icon: "briefcase-business" },
    { id: "2", name: "Full-time", value: "Full-time", icon: "briefcase-business" },
    { id: "3", name: "Part-time", value: "Part-time", icon: "briefcase-business" },
    { id: "4", name: "Contract", value: "Contract", icon: "briefcase-business" },
    { id: "5", name: "Internship", value: "Internship", icon: "briefcase-business" },
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
            title: "Salary Range (USD)", 
            type: "dual-range", 
            placeholder: "",
            min: 0,
            max: 10000,
            step: 100,
            formatValue: (value: number) => `$${value.toLocaleString()}`,
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

const PAGE_SIZE = 6;

const useJobPostTable = () => {
    const router = useRouter()
    
    // State for filters and UI
    const [filters, setFilters] = useState<JobPostFilters>({})
    const [isJobApplicationOpen, setIsJobApplicationOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null)
    
    // Client-side pagination state
    const [displayCount, setDisplayCount] = useState(PAGE_SIZE)

    const { user, _hasHydrated, isAuthenticated } = useAuthStore()
    
    // Fetch ALL job posts (server doesn't support pagination)
    const { 
        data: allJobPosts = [], 
        isLoading: loading, 
        error: queryError 
    } = useQuery({
        queryKey: ["job-posts", filters],
        queryFn: () => loadJobPost(filters),
    })

    const jobPosts = allJobPosts.slice(0, displayCount)

    // Total count of all filtered job posts
    const totalCount = allJobPosts.length

    // Check if there are more items to load
    const hasNextPage = displayCount < totalCount

    // Simulate loading state for load more (instant since data is already fetched)
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

    const {
        data: JobApplication = []
    } = useQuery({
        queryKey: ["job-applications", user?.id],
        queryFn: () => getJobApplication(user!.id),
        enabled: _hasHydrated && !!user?.id,  // Wait for hydration AND user login
    })

    function hasApplied(jobId: string) {
        return JobApplication.some((application) => application.jobId === jobId)
    }
    
    // Convert error to string for backwards compatibility
    const error = queryError ? (queryError instanceof Error ? queryError.message : 'Failed to load job posts') : null
    
    // Handle filter form submission
    const handleFilterSubmit = (formData: Record<string, unknown>) => {
        // Reset pagination when filters change
        setDisplayCount(PAGE_SIZE)
        
        const newFilters: JobPostFilters = {
            jobTitle: formData.jobTitle as string || undefined,
            location: formData.location as string || undefined,
            employmentType: (formData.employmentType as string) || undefined,
            minSalary: formData.salaryRange_min ? Number(formData.salaryRange_min) : undefined,
            maxSalary: formData.salaryRange_max ? Number(formData.salaryRange_max) : undefined,
        }
        
        // Remove undefined/empty values
        const cleanFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([, value]) => value !== undefined && value !== "")
        ) as JobPostFilters
        
        setFilters(cleanFilters)
    }
    
    const removeFilter = (key: keyof JobPostFilters) => {
        setDisplayCount(PAGE_SIZE)
        
        setFilters(prev => {
            const newFilters = { ...prev }
            delete newFilters[key]
            return newFilters
        })
    }

    const handleViewDetail = (post: JobPost) => {
        router.push(`/jobs/${post.jobId}`)
    }

    const handleApply = async (job: JobPost) => {
        setSelectedJob(job)
        setIsJobApplicationOpen(true)
    }

    // Handle load more button click
    const handleLoadMore = () => {
        if (hasNextPage) {
            setIsFetchingNextPage(true)
            setTimeout(() => {
                setDisplayCount(prev => Math.min(prev + PAGE_SIZE, totalCount))
                setIsFetchingNextPage(false)
            }, 300)
        }
    }

    return {
        filterFormConfig,
        filters,
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
    }
}

export { useJobPostTable }