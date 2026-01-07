import { APPLICANT_URL, SKILL_URL } from "@/config/URLConfig";
import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { WorkExpData, SkillsFromWorkExp } from "../types";

export const getWorkExperiences = async (
    userId: string,
): Promise<ApiResponse<WorkExpData>> => {
    const endpoint = `/work-history/${userId}`;
    const response = await httpHelper.get<WorkExpData>(endpoint);
    console.log("getWorkExperiences response:", response);

    return response;
}


export const fetchSkillDetailsByIds = async (
    skillIds: string[],
): Promise<ApiResponse<SkillsFromWorkExp[]>> => {
    if (!skillIds || skillIds.length === 0) {
        return { status: 200, data: [] };
    }

    try {
        const skillRequests = skillIds.map((skillId) => {
            const endpoint = `${SKILL_URL}/${skillId}`;
            return httpHelper.get<SkillsFromWorkExp>(endpoint);
        });

        const responses = await Promise.all(skillRequests);
        
        const skillsData = responses.map((response) => response.data);
        
        return { status: 200, data: skillsData };
    } catch (error) {
        console.error("Error fetching skills:", error);
        return { status: 500, data: [] };
    }
}