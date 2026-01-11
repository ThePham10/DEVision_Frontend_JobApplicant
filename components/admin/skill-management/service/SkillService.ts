import { httpHelper } from "@/utils/httpHelper";
import { Skill, PaginatedResponse} from "../types";
import { SKILL_URL } from "@/config/URLConfig";

interface ApiFilter {
    id: string;
    value: string;
    operator: string;
}

/**
 * Load all skills with pagination
 */
async function loadSkills(
    filters?: ApiFilter[]
): Promise<PaginatedResponse<Skill>> {
    // Build query params
    const params = new URLSearchParams();
    
    if (filters && filters.length > 0) {
        params.append('filters', JSON.stringify(filters));
    }

    // Build URL
    const url = `${SKILL_URL}?limit=100&${params.toString()}`;

    // Send request
    const response = await httpHelper.get<PaginatedResponse<Skill>>(url);
    
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
                totalPages: 1
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
            totalPages: 0
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
