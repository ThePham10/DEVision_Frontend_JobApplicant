type Company = {
    id: string;
    companyId: string;
    email: string;
    companyName: string;
    avatarUrl?: string;
    subscriptionType?: string;
    subscriptionActive?: boolean;
    authProvider: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
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