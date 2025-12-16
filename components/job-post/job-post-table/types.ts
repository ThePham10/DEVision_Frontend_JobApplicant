// Job Post data type
type JobPost = {
    id: number;
    title: string;
    company: string;
    employmentType: string;
    skills: string[];
    location: string;
    minSalary: number;
    maxSalary: number;
    description: string;
}

// Filter parameters sent to backend API
type JobPostFilters = {
    jobTitle?: string;
    location?: string;
    employmentType?: string;
    minSalary?: number;
    maxSalary?: number;
}

// API response structure (common pattern)
type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { JobPost, JobPostFilters, PaginatedResponse }