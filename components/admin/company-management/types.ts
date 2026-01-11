type Company = {
    id: string;
    userId: string;
    email: string;
    phoneNumber?: string;
    companyName: string;
    streetAddress?: string;
    city?: string;
    country?: string;
    aboutUs?: string;
    subscriptionType?: string;
    subscriptionActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
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