type ApplicantAccount = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type ApplicantFilters = {
    name?: string;
    email?: string;
    phone?: string;
}

type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { ApplicantAccount, ApplicantFilters, PaginatedResponse };