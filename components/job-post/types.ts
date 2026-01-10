// Job Post type - matches JM team's API response exactly
export type JobPostCriteria = {
    requiredSkillIds: string[];
    location: string;
    salaryType: string;
    salaryCurrency: string;
    salaryRange: {
        min: number;
        max: number;
    };
    employmentType: string;
    isFresherFriendly: boolean;
}

export type JobPost = {
    jobId: string;
    companyId: string;
    companyName: string;
    title: string;
    description: string;
    criteria: JobPostCriteria;
    postedAt: string;
    expiresAt: string;
}

// Filter parameters for client-side filtering
export type JobPostFilters = {
    jobTitle?: string;
    location?: string;
    employmentType?: string;
    minSalary?: number;
    maxSalary?: number;
}
