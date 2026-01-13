import { useState } from "react"
import { getJobApplication, submitApplication } from "../service/JobApplicationService"
import { JobApplicationStatus, JobApplication, ApplicationFormData } from "../types"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store"
import { loadJobPost } from "@/components/job-post/job-post-table/service/JobPostTableService"

/**
 * Job Application hook
 */
export function useJobApplication() { 
    // State
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeFilter, setActiveFilter] = useState<JobApplicationStatus | undefined>(undefined)

    // Auth store
    const { user } = useAuthStore()

    // The query for fetching all job posts with the setting will refetch after 5 minutes
    const { data: allJobPosts } = useQuery({
        queryKey: ["all-job-posts"],
        queryFn: () => loadJobPost(),
        staleTime: 5 * 60 * 1000
    })

    // The query for fetching the job application
    const {
        data: jobApplications,
        isLoading
    } = useQuery({
        queryKey: ["job-applications"],
        queryFn: () => getJobApplication(user?.id || "")
    })

    // Handle the filter click
    const handleFilterClick = (status: JobApplicationStatus | undefined) => {
        setActiveFilter(status)
    }

    // Calculate counts for each status
    const getCountForStatus = (status: JobApplicationStatus | undefined) => {
        const applications = jobApplications ?? []
        if (status === undefined) return applications.length
        return applications.filter(app => app.status === status).length
    }

    // Enrich applications with job post info
    const enrichedApplications = (jobApplications ?? []).map(app => {
        const jobPost = allJobPosts?.find(jp => jp.jobId === app.jobId)
        return {
            ...app,
            jobTitle: jobPost?.title ?? "Unknown Job",
            location: jobPost?.location ?? "Unknown Location",
            company: jobPost?.companyName ?? "Unknown Company",
        }
    })

    // Check whether the user has applied to the job
    const hasAppliedToJob = (jobId: string): boolean => {
        return (jobApplications ?? []).some(app => app.jobId === jobId)
    }

    // Filter applications based on selected status (using enriched data)
    const filteredApplications = activeFilter
        ? enrichedApplications.filter(app => app.status === activeFilter)
        : enrichedApplications

    // Submit a new application
    const handleSubmit = async (formData: ApplicationFormData): Promise<JobApplication | null> => {
        setIsSubmitting(true)
        try {
            const application = await submitApplication(formData)
            return application
        } catch (error) {
            console.error("Failed to submit application:", error)
            return null
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        jobApplications: enrichedApplications,
        isLoading,
        isSubmitting,
        handleFilterClick,
        filteredApplications,
        activeFilter,
        getCountForStatus,
        hasAppliedToJob,
        handleSubmit
    }
}
