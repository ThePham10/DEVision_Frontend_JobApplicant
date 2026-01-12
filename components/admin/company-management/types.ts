// Define the Company type
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

export type { Company };