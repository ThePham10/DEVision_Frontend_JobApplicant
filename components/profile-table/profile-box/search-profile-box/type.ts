export type SearchProfile = {
    desiredRoles: string[];
    skillIds: string[];
    skillNames: string[];
    desiredLocations: string[];
    expectedSalary: {
        min: number;
        max: number;
        currency: string;
    };
    employmentTypes: string[];
    isActive: boolean;
}