import { useState } from "react"
import { getJobApplication, submitApplication } from "../service/JobApplicationService"
import { JobApplicationStatus, JobApplication, ApplicationFormData } from "../types"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store"
import { loadJobPost } from "@/components/job-post/job-post-table/service/JobPostTableService"
import { Briefcase, Clock, Archive } from "lucide-react"

/**
 * Custom hook for managing job applications
 */
export function useJobApplication() { 
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { user } = useAuthStore()

    const { data: allJobPosts } = useQuery({
        queryKey: ["all-job-posts"],
        queryFn: () => loadJobPost(),
        staleTime: 5 * 60 * 1000
    })

    const {
        data: jobApplications,
        isLoading
    } = useQuery({
        queryKey: ["job-applications"],
        queryFn: () => getJobApplication(user?.id || "")
    })

    const [activeFilter, setActiveFilter] = useState<JobApplicationStatus | undefined>(undefined)

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

    const hasAppliedToJob = (jobId: string): boolean => {
        return (jobApplications ?? []).some(app => app.jobId === jobId)
    }

    // Filter applications based on selected status (using enriched data)
    const filteredApplications = activeFilter
        ? enrichedApplications.filter(app => app.status === activeFilter)
        : enrichedApplications

    const statCards = [
        {
            label: "Total Applications",
            value: enrichedApplications.length,
            icon: Briefcase,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50"
        },
        {
            label: "Pending",
            value: getCountForStatus(JobApplicationStatus.PENDING),
            icon: Clock,
            gradient: "from-amber-500 to-yellow-600",
            bgGradient: "from-amber-50 to-yellow-50"
        },
        {
            label: "Archived",
            value: getCountForStatus(JobApplicationStatus.ARCHIVED),
            icon: Archive,
            gradient: "from-gray-500 to-slate-600",
            bgGradient: "from-gray-50 to-slate-50"
        }
    ]

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
        statCards,
        activeFilter,
        getCountForStatus,
        hasAppliedToJob,
        handleSubmit
    }
}
