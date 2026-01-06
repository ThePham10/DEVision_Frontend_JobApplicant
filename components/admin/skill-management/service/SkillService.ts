import { httpHelper } from "@/utils/httpHelper";
import { Skill, PaginatedResponse} from "../types";
import { SKILL_URL } from "@/config/URLConfig";

/**
 * Load all skills with pagination
 */
async function loadSkills(
    page: number,
    limit: number,
): Promise<PaginatedResponse<Skill>> {
    const url = `${SKILL_URL}?limit=${limit}&page=${page}`;
    const response = await httpHelper.get<PaginatedResponse<Skill>>(url);
    
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
            hasMore: false
        };
    }
}

/**
 * Load skills by category ID
 */
async function loadSkillsByCategory(
    jobCategoryId: string,
): Promise<PaginatedResponse<Skill>> {
    const url = `${SKILL_URL}/category/${jobCategoryId}`;
    // The API might return either an array or a PaginatedResponse
    const response = await httpHelper.get<Skill[] | PaginatedResponse<Skill>>(url);
    
    if (response.status === 200) {
        const responseData = response.data;
        
        // Check if the response is an array (not a paginated response)
        if (Array.isArray(responseData)) {
            // Wrap the array in a PaginatedResponse format
            return {
                data: responseData,
                total: responseData.length,
                page: 1,
                limit: responseData.length,
                hasMore: false
            };
        }
        
        // Otherwise, it's already a PaginatedResponse
        return responseData;
    } else {
        return {
            data: [],
            total: 0,
            page: 1,
            limit: 0,
            hasMore: false
        };
    }
}

/**
 * Create a new skill
 */
async function createSkill(skill: Omit<Skill, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<Skill> {
    const response = await httpHelper.post<Skill>(SKILL_URL, skill);
    
    if (response.status === 201) {
        return response.data;
    } else {
        return {
            id: "",
            name: "",
            jobCategoryId: "",
            description: "",
            icon: "",
            createdBy: "",
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}

/**
 * Update an existing skill
 */
async function updateSkill(id: string, updates: Partial<Omit<Skill, "id" | "createdAt">>): Promise<Skill | null> {
    console.log(JSON.stringify(updates))
    const response = await httpHelper.patch<Skill>(SKILL_URL + "/" + id, updates);
    
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

/**
 * Deactive an existing skill
 */
async function deActiveSkill(id: string): Promise<boolean> {
    const response = await httpHelper.delete<Skill>(SKILL_URL + "/" + id);
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

/**
 * Delete a skill
 */
async function deleteSkill(id: string): Promise<boolean> { 
    const response = await httpHelper.delete<Skill>(SKILL_URL + "/" + id + "/hard")
    return response.status === 200;
}

export { loadSkills, loadSkillsByCategory, createSkill, updateSkill, deActiveSkill, deleteSkill };
