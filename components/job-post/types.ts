export type JobPost = {
    jobId: string;
    companyId: string;
    companyName: string;
    title: string;
    description: string;
    location: string;
    employmentType: string;
    additionalEmploymentTypes: string[];
    salaryDisplay: string;
    status: string;
    postedDate: string;
    expireDate: string;
    skills: string[];
    isFresherFriendly: boolean;
}

// Filter parameters for client-side filtering
export type JobPostFilters = {
    jobTitle?: string;
    location?: string;
    employmentType?: string;
    minSalary?: number;
    maxSalary?: number;
}
