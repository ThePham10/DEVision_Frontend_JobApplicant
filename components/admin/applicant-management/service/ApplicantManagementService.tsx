import { httpHelper } from "@/utils/httpHelper";
import { ApplicantAccount, ApplicantFilters, PaginatedResponse } from "../types";
import { APPLICANT_URL } from "@/config/URLConfig";

// Define the search filter type for API requests
interface SearchFilter {
    id: string;
    value: string;
    operator: string;
}

/**
* Function to load applicants with optional search filters
* @param - search filters
* @returns - paginated response of applicant accounts
*/
async function loadApplicants(
    searchFilters?: SearchFilter[],
): Promise<PaginatedResponse<ApplicantAccount>> {
    // Build query parameters
    const params = new URLSearchParams();

    // Append filters if provided
    if (searchFilters && searchFilters.length > 0) {
        params.append('filters', JSON.stringify(searchFilters));
    }

    const endpoint = `${APPLICANT_URL}?limit=50&${params.toString()}`;
    const response = await httpHelper.get<PaginatedResponse<ApplicantAccount>>(endpoint);

    // Handle response
    if (response.status === 200) {
        const data = response.data;
        return data;
    } else {
        return {
            data: [],
            total: 0,
            page: 0,
            limit: 0,
            totalPages: 0
        };
    }
}

/**
* Function to deactivate an applicant account
* @param - applicant ID
* @returns - success status
*/
async function deactivateApplicant( applicantId: string ): Promise<boolean> {
    const url = `${APPLICANT_URL}/${applicantId}`;
    const response = await httpHelper.delete<ApplicantAccount>(url);
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

/**
* Function to activate an applicant account
* @param - applicant ID
* @returns - success status
*/
async function activateApplicant( applicantId: string ): Promise<boolean> {
    const response = await httpHelper.put<ApplicantAccount>(APPLICANT_URL + "/" + `${applicantId}`, { isActive: true });
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export { 
    loadApplicants,
    deactivateApplicant,
    activateApplicant
};
