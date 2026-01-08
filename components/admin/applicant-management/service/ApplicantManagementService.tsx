import { httpHelper } from "@/utils/httpHelper";
import { ApplicantAccount, ApplicantFilters, PaginatedResponse } from "../types";
import { APPLICANT_URL } from "@/config/URLConfig";

async function loadApplicants(
    page: number,
    limit: number,
): Promise<PaginatedResponse<ApplicantAccount>> {
    const endpoint = `${APPLICANT_URL}?limit=${limit}&page=${page}`;

    const response = await httpHelper.get<PaginatedResponse<ApplicantAccount>>(endpoint);

    if (response.status === 200) {
        const data = response.data;
        // Calculate hasMore if API doesn't return it
        const hasMore = data.hasMore ?? (data.page * data.limit < data.total);
        return { ...data, hasMore };
    } else {
        return {
            data: [],
            total: 0,
            page,
            limit,
            hasMore: false,
        };
    }
}

async function deactivateApplicant(
    applicantId: string,
): Promise<boolean> {
    const url = `${APPLICANT_URL}/${applicantId}`;
    const response = await httpHelper.delete<ApplicantAccount>(url);
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

async function activateApplicant(
    applicantId: string,
): Promise<boolean> {
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
