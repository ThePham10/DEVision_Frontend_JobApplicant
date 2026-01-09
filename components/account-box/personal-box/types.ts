type AccountData = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    avatarUrl?: string;
    addressProvinceCode?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type { AccountData };