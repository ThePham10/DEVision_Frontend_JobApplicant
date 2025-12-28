import { JobPost } from "../../types"
import { allJobPosts } from "../../types"

const loadJobPostById = async (jobId: string): Promise<JobPost | null> => {
    try {
        return allJobPosts.find(job => job.jobId === jobId) || null;
    } catch (error) {
        console.error('Error fetching job post by ID:', error);
        return null;
    }
}


export { loadJobPostById }