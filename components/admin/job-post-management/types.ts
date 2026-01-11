import { JobPost, JobPostFilters } from "@/components/job-post/types";

export const employmentTypes = [
    { id: "", name: "All Types", value: "" },
    { id: "Full-time", name: "Full-time", value: "Full-time" },
    { id: "Part-time", name: "Part-time", value: "Part-time" },
    { id: "Contract", name: "Contract", value: "Contract" },
    { id: "Internship", name: "Internship", value: "Internship" },
];

export const statusOptions = [
    { id: "", name: "All Status", value: "" },
    { id: "PUBLIC", name: "Public", value: "PUBLIC" },
    { id: "PRIVATE", name: "Private", value: "PRIVATE" },
];

export interface JobSearchParams {
    keyword?: string;
    location?: string;
    employmentTypes?: string[];
    skills?: string[];
    minSalary?: number;
    maxSalary?: number;
}

export type { JobPost, JobPostFilters };
