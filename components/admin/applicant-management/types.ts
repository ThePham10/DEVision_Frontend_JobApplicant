type ApplicantAccount = {
    id: string;
    name: string;
    email: string;
    phone: string;
    emailVerified: boolean;
    subscription: boolean;
    createdAt: Date;
}

type ApplicantFilters = {
    name?: string;
    email?: string;
    phone?: string;
    emailVerified?: boolean;
    subscription?: boolean;
}

type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export type { ApplicantAccount, ApplicantFilters, PaginatedResponse };