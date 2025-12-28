// Job Application Status enum
export enum JobApplicationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    ARCHIVED = "ARCHIVED"
}

// Job Application data type
export type JobApplication = {
    id: string
    jobId: string
    jobTitle: string
    company: string
    location: string
    appliedAt: Date
    status: JobApplicationStatus
    coverLetter?: string
    cvFileName: string
}

// Application form data for submission
export type ApplicationFormData = {
    jobId: string
    coverLetterFile: File | null
    cvFile: File | null
}

// Paginated response structure
export type PaginatedJobApplicationResponse = {
    data: JobApplication[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

// Filter parameters
export type JobApplicationFilters = {
    status?: JobApplicationStatus
}
