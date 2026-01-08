import { APPLICANT_URL, WORK_HISTORY_URL } from "@/config/URLConfig";
import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { WorkExpData } from "../types";

export const getWorkExperiences = async (
    userId: string,
): Promise<ApiResponse<WorkExpData[]>> => {
    const endpoint = `${WORK_HISTORY_URL}/applicant/${userId}`;
    const response = await httpHelper.get<WorkExpData[]>(endpoint);
    console.log("getWorkExperiences response:", response);

    return response;
}