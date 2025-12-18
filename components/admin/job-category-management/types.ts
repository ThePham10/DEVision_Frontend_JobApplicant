// Job Category data type
type JobCategory = {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Filter parameters for job categories
type JobCategoryFilters = {
    name?: string;
    isActive?: boolean;
}

// API response structure
type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { JobCategory, JobCategoryFilters, PaginatedResponse };
