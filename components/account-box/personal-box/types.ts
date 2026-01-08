type AccountData = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    addressProvinceCode?: string;
    addressProvinceName?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type { AccountData };