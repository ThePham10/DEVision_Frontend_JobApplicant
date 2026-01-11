import { JobPost, JobPostFilters } from "../../types"
import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { JOB_POST_URL } from "@/config/URLConfig"

/**
 * Parses salary display string to extract min/max numeric values
 * Handles formats like "3000 - 4000 USD", "5000 USD", "Negotiable"
 * 
 * @param salaryDisplay - The salary string to parse (e.g., "3000 - 4000 USD")
 * @returns Object with min, max, and isNegotiable properties
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
 * Fetches job posts from JM team backend with server-side filtering
 * Uses the /search endpoint when filters are provided
 */
async function loadJobPost( 
    filters?: JobPostFilters
): Promise<JobPost[]> {
    try {
        // Check if any filters are provided
        const hasFilters = filters && Object.keys(filters).some(key => {
            const value = filters[key as keyof JobPostFilters];
            return value !== undefined && value !== "";
        });

        if (hasFilters) {
            // Build query params for search endpoint
            const queryParams = new URLSearchParams();
            
            // Map jobTitle to keyword
            if (filters?.jobTitle) {
                queryParams.append('keyword', filters.jobTitle);
            }
            
            // Location filter
            if (filters?.location) {
                queryParams.append('location', filters.location);
            }
            
            // Employment type filter (API expects array)
            if (filters?.employmentType) {
                queryParams.append('employmentTypes', filters.employmentType);
            }
            
            // Salary range filters
            if (filters?.minSalary !== undefined) {
                queryParams.append('minSalary', filters.minSalary.toString());
            }
            
            if (filters?.maxSalary !== undefined) {
                queryParams.append('maxSalary', filters.maxSalary.toString());
            }
            
            // Call search endpoint with filters
            const url = `${JOB_POST_URL}/search?${queryParams.toString()}`;
            const response = await jmHttpHelper.get<JobPost[]>(url);
            return response.data ?? [];
        } else {
            // No filters - fetch all job posts
            const response = await jmHttpHelper.get<JobPost[]>(JOB_POST_URL);
            return response.data ?? [];
        }
        
    } catch (error) {
        console.error('Error fetching job posts from JM team:', error);
        throw error;
    }
}

export { loadJobPost, parseSalaryRange }