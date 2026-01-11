export type SearchProfile = {
    desiredRoles: string[];
    skillIds: string[];
    desiredLocations: string[];
    expectedSalary: {
        min: number;
        max: number;
        currency: string;
    };
    employmentTypes: string[];
}