import { APPLICANT_URL, WORK_HISTORY_URL } from "@/config/URLConfig";
import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { WorkExpData } from "../types";

export const getWorkExperiences = async (
    userId: string,
): Promise<ApiResponse<WorkExpData[]>> => {
    const endpoint = `${WORK_HISTORY_URL}/applicant/${userId}`;
    const response = await httpHelper.get<WorkExpData[]>(endpoint);
    return response;
}

export const deleteWorkExperience = async (workExpId: string): Promise<boolean> => {
    const endpoint = `${WORK_HISTORY_URL}/${workExpId}`;
    const response = await httpHelper.delete<WorkExpData>(endpoint);

    return response.status === 200;
}

export const updateWorkExperience = async (
    workExpId: string,
    // remove applicantId, createdAt, updatedAt from updates
    updates: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">>
): Promise<WorkExpData | null> => {
    const endpoint = `${WORK_HISTORY_URL}/${workExpId}`;
    const response = await httpHelper.put<WorkExpData>(endpoint, updates);

    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

export const createWorkExperience = async (workExpData: Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">): Promise<WorkExpData | null> => {
    const endpoint = `${WORK_HISTORY_URL}`;
    const response = await httpHelper.post<WorkExpData>(endpoint, workExpData);
    console.log("createWorkExperience response:", response);

    if (response.status === 201) {
        return response.data;
    } else {
        return null;
    }
}