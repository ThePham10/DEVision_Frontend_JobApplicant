type Company = {
    id: string;
    name: string;
    email: string;
    address?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    field?: string;
}

type CompanyFilters = {
    name?: string;
}

type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { Company, CompanyFilters, PaginatedResponse };