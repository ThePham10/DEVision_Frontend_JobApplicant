import { UserProfile } from "firebase/auth";
import { httpHelper } from "@/utils/httpHelper";
import { APPLICANT_URL } from "@/config/URLConfig";

export const addNewSkill = async (id: string, currentSkills: string[], data: string[]): Promise<UserProfile | null | undefined> => {
    try {
        // Combine current skills with new skills (with duplicates removed)
        const combinedSkills = [...new Set([...currentSkills, ...data])];

        const response = await httpHelper.put<UserProfile>(APPLICANT_URL + "/" + id, { skillCategories: combinedSkills });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const deleteSkill = async (id: string, currentSkills: string[], skill: string): Promise<UserProfile | null | undefined> => {
    try {
        // Remove the skill from the array using filter
        const filteredSkills = currentSkills.filter((s) => s !== skill);

        const response = await httpHelper.put<UserProfile>(APPLICANT_URL + "/" + id, { skillCategories: filteredSkills });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}