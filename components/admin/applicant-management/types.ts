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

type ApplicantFilters = {
    name?: string;
    isActive?:boolean;
}

type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type { ApplicantAccount, ApplicantFilters, PaginatedResponse };