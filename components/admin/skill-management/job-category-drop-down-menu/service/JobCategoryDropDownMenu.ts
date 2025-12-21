import { JOB_CATEGORY_URL } from "@/Config/URLConfig";
import { httpHelper } from "@/utils/httpHelper";
import { JobCategory, PaginatedResponse } from "@/components/admin/job-category-management/types";

async function fetchJobCategories(): Promise<JobCategory[]> {
    const response = await httpHelper.get<PaginatedResponse<JobCategory>>(JOB_CATEGORY_URL);
    
    if (response.status === 200) {
        return response.data.data;
    } else {
        return [];
    }
}

export default fetchJobCategories;