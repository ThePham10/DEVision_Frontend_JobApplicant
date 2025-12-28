
import { JOB_POST_URL } from "@/config/URLConfig"
import { JobPost, JobPostFilters, allJobPosts } from "../../types"

/**
 * Fetches job posts from JM team backend
 * Uses jmHttpHelper which automatically includes URL and API key
 */
async function loadJobPost( 
    filters?: JobPostFilters
): Promise<JobPost[]> {
    try {
        // Fetch ALL job posts from JM team backend
        // const response = await jmHttpHelper.get<JobPost[]>(JOB_POST_URL);
        // const allJobPosts = response.data;
        
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
            
            // Filter by location
            if (filters.location) {
                const searchLocation = filters.location.toLowerCase();
                filteredItems = filteredItems.filter(job => 
                    job.location.toLowerCase().includes(searchLocation)
                );
            }
            
            // Filter by employment type (use primaryEmploymentType)
            if (filters.employmentType) {
                filteredItems = filteredItems.filter(job => 
                    job.employmentType.toLowerCase() === filters.employmentType?.toLowerCase()
                );
            }
            
            // Filter by salary range (parse from salaryDisplay)
            if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
                filteredItems = filteredItems.filter(job => {
                    // Parse salary from display string like "100,000 - 150,000 AUD"
                    const salaryMatch = job.salaryDisplay.match(/(\d[\d,]*)\s*-\s*(\d[\d,]*)/);
                    if (!salaryMatch) return true; // Keep if can't parse
                    
                    const minSal = parseInt(salaryMatch[1].replace(/,/g, ''));
                    const maxSal = parseInt(salaryMatch[2].replace(/,/g, ''));
                    
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