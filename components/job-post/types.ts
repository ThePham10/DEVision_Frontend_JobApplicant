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

export const allJobPosts : JobPost[] = [
    {
        jobId: "JP-5d66ff0c-3f7d-419f-874f-a96a66e9b38c",
        companyId: "694114bc8adf5f09f17b9369",
        title: "Apple Electrical Engineering",
        description: "Working to create iPhone 20",
        companyName: null,
        location: "California",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "Negotiable",
        status: "PUBLIC",
        postedDate: null,
        expireDate: "2028-02-19",
        skills: [
            "Git"
        ],
    },
    {
        jobId: "JP-99e7c1c4-79e2-4ae1-b5a1-7dad5c59c5eb",
        companyId: "694114bc8adf5f09f17b9369",
        title: "SpringBoot Java Developer",
        description: "Looking for experienced SpringBoot developer with Spring Boot expertise",
        companyName: null,
        location: "Melbourne, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 20000 USD",
        status: "PUBLIC",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "Docker",
            "Kafka"
        ],
    },
    {
        jobId: "JP-fcf7594a-192c-44d5-9255-fe95d008abcc",
        companyId: "694cfca909161f09897328a6",
        title: "Junior Java Developer",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Melbourne, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-c95bb6dd-895e-4be6-9485-2003d98fe572",
        companyId: "694cfca909161f09897328a6",
        title: "Java Developer",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Melbourne, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-af2d3897-5c56-4daf-b5c5-e4d77a15ae33",
        companyId: "694cfca909161f09897328a6",
        title: "Senior Developer",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Melbourne, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-cd6d32c1-39a3-4c69-a816-e4eda47174fd",
        companyId: "694cfca909161f09897328a6",
        title: "Developer",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Sydney, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-02174f26-840d-4e50-aa48-2549ca4d1d3b",
        companyId: "694cfca909161f09897328a6",
        title: "Please Please",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Sydney, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-57e6e738-55bc-458e-9747-a7c56dda403d",
        companyId: "694cfca909161f09897328a6",
        title: "Please Please Please",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Sydney, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-e98729cc-f5d3-4533-9ad0-d13975e9aedf",
        companyId: "694cfca909161f09897328a6",
        title: "Please Please Please",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Sydney, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "About 2000 USD",
        status: "PRIVATE",
        postedDate: null,
        expireDate: "2026-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    },
    {
        jobId: "JP-b0589f0d-ff30-4530-86ea-13cc723eae7f",
        companyId: "6950d63f09161f0989732903",
        title: "Senior Java Developer",
        description: "Looking for experienced Java developer with Spring Boot expertise",
        companyName: null,
        location: "Melbourne, Australia",
        employmentType: "Full-time",
        additionalEmploymentTypes: [
            "Contract"
        ],
        salaryDisplay: "80000 - 120000 AUD",
        status: "PRIVATE",
        postedDate: "2025-12-28",
        expireDate: "2025-03-01",
        skills: [
            "Java",
            "Spring Boot",
            "MongoDB",
            "Kafka"
        ],
    }
]