// Define type for Applicant
type ApplicantAccount = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive: boolean;
    isPremium?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define type for Filters
type ApplicantFilters = {
    name?: string;
    isActive?:boolean;
}

// Define type for Paginated Response
type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type { ApplicantAccount, ApplicantFilters, PaginatedResponse };