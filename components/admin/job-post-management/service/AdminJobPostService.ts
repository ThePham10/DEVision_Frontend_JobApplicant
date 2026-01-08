import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig";
import { JobPost } from "../types";

/**
 * Load all job posts from JM team API
 */
export async function loadJobPosts(): Promise<JobPost[]> {
    try {
        const response = await jmHttpHelper.get<JobPost[]>(JOB_POST_URL);
        return response.data ?? [];
    } catch (error) {
        console.error("Error loading job posts:", error);
        throw error;
    }
}

/**
 * Load a single job post by ID
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
 */
export async function deleteJobPost(jobId: string): Promise<void> {
    try {
        await jmHttpHelper.delete(`${JOB_POST_URL}/${jobId}`);
    } catch (error) {
        console.error("Error deleting job post:", error);
        throw error;
    }
}
