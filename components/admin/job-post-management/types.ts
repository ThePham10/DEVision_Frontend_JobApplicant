import { JobPost, JobPostFilters } from "@/components/job-post/types";

export const employmentTypes = [
    { id: "", name: "All Types", value: "" },
    { id: "FULL_TIME", name: "Full-time", value: "FULL_TIME" },
    { id: "PART_TIME", name: "Part-time", value: "PART_TIME" },
    { id: "CONTRACT", name: "Contract", value: "CONTRACT" },
    { id: "INTERNSHIP", name: "Internship", value: "INTERNSHIP" },
];

export const statusOptions = [
    { id: "", name: "All Status", value: "" },
    { id: "PUBLIC", name: "Public", value: "PUBLIC" },
    { id: "PRIVATE", name: "Private", value: "PRIVATE" },
];

export type { JobPost, JobPostFilters };
