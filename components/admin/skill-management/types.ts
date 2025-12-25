// Job Category type (from admin/job-category)
type JobCategory = {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    isActive: boolean;
}

// Skill data type
type Skill = {
    id: string;
    name: string;
    jobCategoryId: string;
    description?: string;
    icon?: string;
    createdBy?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Filter parameters for skills
type SkillFilters = {
    name?: string;
    jobCategoryId?: string;
}

// API response structure
type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { Skill, SkillFilters, PaginatedResponse, JobCategory };

