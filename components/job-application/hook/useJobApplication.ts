import { useState, useCallback } from "react"
import { submitApplication, getMyApplications, hasApplied } from "../service/JobApplicationService"
import { JobApplicationFilters, JobApplicationStatus, PaginatedJobApplicationResponse, JobApplication, ApplicationFormData } from "../types"

/**
 * Custom hook for managing job applications
 */
export function useJobApplication() {
    const [filters, setFilters] = useState<JobApplicationFilters>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [checkingApplication, setCheckingApplication] = useState(false)

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

    // Check if already applied
    const checkIfApplied = useCallback(async (jobId: string): Promise<boolean> => {
        setCheckingApplication(true)
        try {
            const applied = await hasApplied(jobId)
            return applied
        } catch (error) {
            console.error("Failed to check application:", error)
            return false
        } finally {
            setCheckingApplication(false)
        }
    }, [])

    // Load applications with current filters
    const loadApplicationsWithFilters = useCallback(
        (page: number, limit: number): Promise<PaginatedJobApplicationResponse> => {
            return getMyApplications(page, limit, filters)
        },
        [filters]
    )

    // Filter by status
    const filterByStatus = (status?: JobApplicationStatus) => {
        setFilters(status ? { status } : {})
    }

    // Clear all filters
    const clearFilters = () => {
        setFilters({})
    }

    return {
        filters,
        isSubmitting,
        checkingApplication,
        handleSubmit,
        checkIfApplied,
        loadApplicationsWithFilters,
        filterByStatus,
        clearFilters,
    }
}
