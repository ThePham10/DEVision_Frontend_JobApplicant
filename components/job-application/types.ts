// Job Application Status enum
export enum JobApplicationStatus {
    PENDING = "PENDING",
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
    mediaUrls: string[]
}

// Filter parameters
export type JobApplicationFilters = {
    status?: JobApplicationStatus
}

export const statusFilters = [
    { label: "All Applications", value: undefined, gradient: "from-slate-600 to-slate-700" },
    { label: "Pending", value: JobApplicationStatus.PENDING, gradient: "from-amber-500 to-yellow-600" },
    { label: "Archived", value: JobApplicationStatus.ARCHIVED, gradient: "from-gray-500 to-slate-600" },
]

// Application form data for submission
export type ApplicationFormData = {
    jobId: string
    coverLetterFile: File | null
    cvFile: File | null
}

export type ReturnMediaUrl = {
    url: string,
    folder: string,
    key: string,
    size: number,
    mimeType: string
}

export type ReturnUploadingData = {
    status: number,
    data: ReturnMediaUrl
}