type AccountData = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    avatarUrl?: string;
    isActive: boolean;
    isPremium?: boolean;
}

export type { AccountData };