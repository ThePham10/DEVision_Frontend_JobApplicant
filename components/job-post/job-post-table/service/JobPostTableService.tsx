import { JobPost, JobPostFilters } from "../../types"
import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig"

/**
 * Fetches job posts from JM team backend
 * Uses jmHttpHelper which automatically includes URL and API key
 */
async function loadJobPost( 
    filters?: JobPostFilters
): Promise<JobPost[]> {
    try {
        // Fetch ALL job posts from JM team backend
        const response = await jmHttpHelper.get<JobPost[]>(JOB_POST_URL);
        const allJobPosts = response.data;
        
        // Apply CLIENT-SIDE filtering
        let filteredItems = [...allJobPosts];
        
        if (filters) {
            // Filter by job title (case-insensitive search)
            if (filters.jobTitle) {
                const searchTerm = filters.jobTitle.toLowerCase();
                filteredItems = filteredItems.filter(job => 
                    job.title.toLowerCase().includes(searchTerm)
                );
            }
            
            // Filter by location (from criteria)
            if (filters.location) {
                const searchLocation = filters.location.toLowerCase();
                filteredItems = filteredItems.filter(job => 
                    job.criteria.location.toLowerCase().includes(searchLocation)
                );
            }
            
            // Filter by employment type (from criteria)
            if (filters.employmentType) {
                filteredItems = filteredItems.filter(job => 
                    job.criteria.employmentType.toLowerCase() === filters.employmentType?.toLowerCase()
                );
            }
            
            // Filter by salary range (from criteria.salaryRange)
            if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
                filteredItems = filteredItems.filter(job => {
                    const minSal = job.criteria.salaryRange.min;
                    const maxSal = job.criteria.salaryRange.max;
                    
                    // Check if job salary range overlaps with filter range
                    if (filters.minSalary && maxSal < filters.minSalary) return false;
                    if (filters.maxSalary && minSal > filters.maxSalary) return false;
                    
                    return true;
                });
            }
        }
        
        return filteredItems
        
    } catch (error) {
        console.error('Error fetching job posts from JM team:', error);
        throw error;
    }
}

export { loadJobPost }