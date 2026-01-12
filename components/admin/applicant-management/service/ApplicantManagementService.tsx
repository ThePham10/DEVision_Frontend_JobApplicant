import { httpHelper } from "@/utils/httpHelper";
import { ApplicantAccount, ApplicantFilters, PaginatedResponse } from "../types";
import { APPLICANT_URL } from "@/config/URLConfig";

interface SearchFilter {
    id: string;
    value: string;
    operator: string;
}

async function loadApplicants(
    searchFilters?: SearchFilter[],
): Promise<PaginatedResponse<ApplicantAccount>> {

    const params = new URLSearchParams();

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

async function deactivateApplicant( applicantId: string ): Promise<boolean> {
    const url = `${APPLICANT_URL}/${applicantId}`;
    const response = await httpHelper.delete<ApplicantAccount>(url);
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

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
