import { APPLICANT_URL } from "@/config/URLConfig";
import { httpHelper } from "@/utils/httpHelper";

/**
 * Update summary objective
 * @param applicantId applicant id
 * @param summary summary objective
 * @returns response
 */
export const updateSummaryObjective = async (applicantId: string, summary: string) => {
    try {
        const response = await httpHelper.put(APPLICANT_URL + "/" + applicantId, { objectiveSummary: summary });
        return response;
    } catch (error) {
        console.log(error);
    }
}