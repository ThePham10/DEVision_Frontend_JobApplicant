import { httpHelper } from "@/utils/httpHelper";
import { JobCategory, JobCategoryFilters, PaginatedResponse } from "../types";
import { JOB_CATEGORY_URL } from "@/config/URLConfig";

// API filter format
interface ApiFilter {
    id: string;
    value: string;
    operator: string;
}

/**
 * Load job categories with pagination and server-side filtering
 */
async function loadJobCategories(
    page: number,
    limit: number,
    filters?: JobCategoryFilters
): Promise<PaginatedResponse<JobCategory>> {
    // Build query params
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    // Build API filters array
    if (filters) {
        const apiFilters: ApiFilter[] = [];

        if (filters.name) {
            apiFilters.push({
                id: 'name',
                value: filters.name,
                operator: 'contains'
            });
        }

        if (filters.isActive !== undefined) {
            apiFilters.push({
                id: 'isActive',
                value: filters.isActive.toString(),
                operator: 'equals'
            });
        }

        if (apiFilters.length > 0) {
            params.append('filters', JSON.stringify(apiFilters));
        }
    }

    const url = `${JOB_CATEGORY_URL}?${params.toString()}`;
    const response = await httpHelper.get<PaginatedResponse<JobCategory>>(url);

    if (response.status === 200) {
        return response.data;
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

async function activateJobCategory(id: string): Promise<boolean> {
    const response = await httpHelper.patch(JOB_CATEGORY_URL + "/" + `${id}`, { isActive: true });

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
    activateJobCategory,
    deleteJobCategory
};
