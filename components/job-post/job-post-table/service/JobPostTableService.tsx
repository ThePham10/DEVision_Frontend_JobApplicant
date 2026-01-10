import { JobPost, JobPostFilters } from "../../types"
import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig"

/**
 * Parses salary display string to extract min/max numeric values
 * Handles formats like "3000 - 4000 USD", "5000 USD", "Negotiable"
 */
function parseSalaryRange(salaryDisplay: string): { min: number | null; max: number | null; isNegotiable: boolean } {
    const lowerSalary = salaryDisplay.toLowerCase().trim();
    
    // Check if it's "negotiable" or similar text
    if (lowerSalary.includes('negotiable') || lowerSalary === '' || lowerSalary === 'n/a') {
        return { min: null, max: null, isNegotiable: true };
    }
    
    // Try to extract numbers from formats like "3000 - 4000 USD" or "3,000 - 4,000"
    const numbers = salaryDisplay.match(/[\d,]+/g);
    
    if (numbers && numbers.length >= 2) {
        return {
            min: parseFloat(numbers[0].replace(/,/g, '')),
            max: parseFloat(numbers[1].replace(/,/g, '')),
            isNegotiable: false
        };
    } else if (numbers && numbers.length === 1) {
        // Single number format like "5000 USD"
        const value = parseFloat(numbers[0].replace(/,/g, ''));
        return {
            min: value,
            max: value,
            isNegotiable: false
        };
    }
    
    // Could not parse - treat as negotiable to not exclude from results
    return { min: null, max: null, isNegotiable: true };
}

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
                    job.location.toLowerCase().includes(searchLocation)
                );
            }
            
            // Filter by employment type (from criteria)
            if (filters.employmentType) {
                filteredItems = filteredItems.filter(job => 
                    job.employmentType.toLowerCase() === filters.employmentType?.toLowerCase()
                );
            }
            
            // Filter by salary range - ALWAYS include negotiable jobs
            if (filters.minSalary !== undefined || filters.maxSalary !== undefined) {
                filteredItems = filteredItems.filter(job => {
                    const parsed = parseSalaryRange(job.salaryDisplay);
                    
                    // Always include negotiable jobs regardless of salary filter
                    if (parsed.isNegotiable) {
                        return true;
                    }
                    
                    // Check if job salary overlaps with filter range
                    const jobMin = parsed.min ?? 0;
                    const jobMax = parsed.max ?? Infinity;
                    const filterMin = filters.minSalary ?? 0;
                    const filterMax = filters.maxSalary ?? Infinity;
                    
                    // Job salary range overlaps with filter range
                    return jobMax >= filterMin && jobMin <= filterMax;
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