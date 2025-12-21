import { httpHelper } from "@/utils/httpHelper";
import { JobCategory, JobCategoryFilters, PaginatedResponse } from "../types";
import { JOB_CATEGORY_URL } from "@/Config/URLConfig";

/**
 * Load job categories with pagination and filtering
 */
async function loadJobCategories(
    page: number,
    limit: number,
    filters?: JobCategoryFilters
): Promise<PaginatedResponse<JobCategory>> {
    const response = await httpHelper.get<PaginatedResponse<JobCategory>>(JOB_CATEGORY_URL);
    
    if (response.status === 200) {
        let filteredItems = response.data.data;
    
        if (filters) {
            if (filters.name) {
                const searchTerm = filters.name.toLowerCase();
                filteredItems = filteredItems.filter(cat =>
                    cat.name.toLowerCase().includes(searchTerm) ||
                    cat.description?.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filters.isActive !== undefined) {
                filteredItems = filteredItems.filter(cat =>
                    cat.isActive === filters.isActive
                );
            }
        }
        
        // Sort by createdAt descending (newest first)
        filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        const startIndex = (page - 1) * limit;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);
        
        return {
            data: paginatedItems,
            total: filteredItems.length,
            page,
            limit,
            hasMore: startIndex + limit < filteredItems.length
        };
    } else {
        return {
            data: [],
            total: 0,
            page: 0,
            limit: 0,
            hasMore: false
        };
    }
}

/**
 * Create a new job category
 */
async function createJobCategory(category: Omit<JobCategory, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<JobCategory> {
    const response = await httpHelper.post<JobCategory>(JOB_CATEGORY_URL, category);

    if (response.status === 201) {
        return response.data;
    } else {
        return {
            id: "",
            name: "",
            description: "",
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}

/**
 * Update an existing job category
 */
async function updateJobCategory(id: string, updates: Partial<Omit<JobCategory, "id" | "createdAt">>): Promise<JobCategory | null> {
    const response = await httpHelper.patch<JobCategory>(JOB_CATEGORY_URL + "/" + `${id}`, updates);
    
    console.log(response.status)

    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

/**
 * Delete a job category
 */
async function deActiveJobCategory(id: string): Promise<boolean> {
    const response = await httpHelper.delete(JOB_CATEGORY_URL + "/" + `${id}`);
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

async function deleteJobCategory(id: string): Promise<boolean> {
    const response = await httpHelper.delete(JOB_CATEGORY_URL + "/" + `${id}` + "/hard");
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export { 
    loadJobCategories, 
    createJobCategory, 
    updateJobCategory, 
    deActiveJobCategory,
    deleteJobCategory 
};
