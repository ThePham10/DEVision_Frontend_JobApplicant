import { JobPost } from "../../types"
import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig";


/**
 * Load job post by id
 * @param jobId - the job id
 * @returns the job post data
 */
const loadJobPostById = async (jobId: string): Promise<JobPost | null> => {
    try {
        const response = await jmHttpHelper.get<JobPost>(JOB_POST_URL + "/" + jobId);
        return response.data;
    } catch (error) {
        console.error('Error fetching job post by ID:', error);
        return null;
    }
}


export { loadJobPostById }