import { JobPost, JobPostFilters, PaginatedResponse } from "../types"

// Mock data for development
const mockJobPosts: JobPost[] = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "Ho Chi Minh City, Vietnam",
        employmentType: "Full-time",
        skills: ["React", "Node.js", "TypeScript"],
        minSalary: 1500,
        maxSalary: 2500,
        description: "Description 1",
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "StartupXYZ",
        location: "Ha Noi, Vietnam",
        employmentType: "Full-time",
        skills: ["Java Spring Boot", "Python", "Django"],
        minSalary: 1200,
        maxSalary: 2000,
        description: "Description 2",
    },
    {
        id: 3,
        title: "Frontend Developer",
        company: "Digital Agency",
        location: "Da Nang, Vietnam",
        employmentType: "Part-time",
        skills: ["React", "Vue.js", "CSS"],
        minSalary: 800,
        maxSalary: 1500,
        description: "Description 3",
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Ho Chi Minh City, Vietnam",
        employmentType: "Full-time",
        skills: ["Docker", "Kubernetes", "AWS"],
        minSalary: 2000,
        maxSalary: 3500,
        description: "Description 4",
    },
    {
        id: 5,
        title: "Junior Developer",
        company: "Learning Corp",
        location: "Ho Chi Minh City, Vietnam",
        employmentType: "Internship",
        skills: ["JavaScript", "HTML", "CSS"],
        minSalary: 300,
        maxSalary: 500,
        description: "Description 5",
    },
    {
        id: 6,
        title: "Mobile Developer",
        company: "AppFactory",
        location: "Ho Chi Minh City, Vietnam",
        employmentType: "Contract",
        skills: ["React Native", "Flutter", "Swift"],
        minSalary: 1800,
        maxSalary: 2800,
        description: "Description 6",
    },
    {
        id: 7,
        title: "Data Engineer",
        company: "DataDriven",
        location: "Ha Noi, Vietnam",
        employmentType: "Full-time",
        skills: ["Python", "Spark", "SQL"],
        minSalary: 2200,
        maxSalary: 3800,
        description: "Description 7",
    },
    {
        id: 8,
        title: "QA Engineer",
        company: "QualityFirst",
        location: "Da Nang, Vietnam",
        employmentType: "Full-time",
        skills: ["Selenium", "Cypress", "Jest"],
        minSalary: 1000,
        maxSalary: 1800,
        description: "Description 8",
    },
]

/**
 * Simulates backend API call with filtering
 * In production, replace this with actual API fetch
 */
async function loadJobPost(
    page: number, 
    limit: number, 
    filters?: JobPostFilters
): Promise<PaginatedResponse<JobPost>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Apply filters (simulating backend filtering)
    let filteredItems = [...mockJobPosts]
    
    if (filters) {
        // Filter by job title (case-insensitive search)
        if (filters.jobTitle) {
            const searchTerm = filters.jobTitle.toLowerCase()
            filteredItems = filteredItems.filter(job => 
                job.title.toLowerCase().includes(searchTerm)
            )
        }
        
        // Filter by location
        if (filters.location) {
            const searchLocation = filters.location.toLowerCase()
            filteredItems = filteredItems.filter(job => 
                job.location.toLowerCase().includes(searchLocation)
            )
        }
        
        // Filter by employment type
        if (filters.employmentType) {
            filteredItems = filteredItems.filter(job => 
                job.employmentType.toLowerCase() === filters.employmentType?.toLowerCase()
            )
        }
        
        // Filter by salary range
        if (filters.minSalary !== undefined) {
            filteredItems = filteredItems.filter(job => 
                job.maxSalary >= filters.minSalary!
            )
        }
        
        if (filters.maxSalary !== undefined) {
            filteredItems = filteredItems.filter(job => 
                job.minSalary <= filters.maxSalary!
            )
        }
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit
    const paginatedItems = filteredItems.slice(startIndex, startIndex + limit)
    
    return {
        data: paginatedItems,
        total: filteredItems.length,
        page,
        limit,
        hasMore: startIndex + limit < filteredItems.length
    }
}

/**
 * Production API call example (uncomment when backend is ready)
 */
// async function loadJobPostFromAPI(
//     page: number, 
//     limit: number, 
//     filters?: JobPostFilters
// ): Promise<PaginatedResponse<JobPost>> {
//     const params = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//         ...(filters?.jobTitle && { jobTitle: filters.jobTitle }),
//         ...(filters?.location && { location: filters.location }),
//         ...(filters?.employmentType && { employmentType: filters.employmentType }),
//         ...(filters?.minSalary && { minSalary: filters.minSalary.toString() }),
//         ...(filters?.maxSalary && { maxSalary: filters.maxSalary.toString() }),
//     })
//     
//     const response = await fetch(`/api/jobs?${params}`)
//     return response.json()
// }

export { loadJobPost }