import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig";
import { JobPost, JobSearchParams } from "../types";

/**
 * Load all job posts from JM team API
 * @param params - Search parameters
 * @returns Job posts list
 */
export async function loadJobPosts(params?: JobSearchParams): Promise<JobPost[]> {
    try {
        const queryParams = new URLSearchParams();
        
        if (params?.keyword) {
            queryParams.append('keyword', params.keyword);
        }
        
        if (params?.employmentTypes && params.employmentTypes.length > 0) {
            params.employmentTypes.forEach(type => {
                queryParams.append('employmentTypes', type);
            });
        }

        const url = queryParams.toString() 
            ? `${JOB_POST_URL}/search?${queryParams.toString()}` 
            : JOB_POST_URL;

        const response = await jmHttpHelper.get<JobPost[]>(url);
        return response.data ?? [];
    } catch (error) {
        console.error("Error loading job posts:", error);
        throw error;
    }
}

/**
 * Load a single job post by ID
 * @param jobId - Job ID
 * @returns Job post
 */
export async function loadJobPostById(jobId: string): Promise<JobPost | null> {
    try {
        const response = await jmHttpHelper.get<JobPost>(`${JOB_POST_URL}/${jobId}`);
        return response.data ?? null;
    } catch (error) {
        console.error("Error loading job post by ID:", error);
        throw error;
    }
}

/**
 * Delete a job post by ID
 * @param jobId - Job ID
 */
export async function deleteJobPost(jobId: string): Promise<void> {
    try {
        await jmHttpHelper.delete(`${JOB_POST_URL}/${jobId}`);
    } catch (error) {
        console.error("Error deleting job post:", error);
        throw error;
    }
}
