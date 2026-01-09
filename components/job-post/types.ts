// Job Post type - matches JM team's API response exactly
export type JobPost = {
    jobId: string;
    companyId: string;
    companyName: string | null;
    title: string;
    description: string;
    location: string;
    employmentType: string;
    additionalEmploymentTypes: string[];
    salaryDisplay: string;
    status: string;
    postedDate: string | null;
    expireDate: string;
    skills: string[];
}

// Filter parameters for client-side filtering
export type JobPostFilters = {
    jobTitle?: string;
    location?: string;
    employmentType?: string;
    minSalary?: number;
    maxSalary?: number;
}

