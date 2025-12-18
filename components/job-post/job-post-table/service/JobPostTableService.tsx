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
        description: "About NAVER Corp And NAVER Vietnam NAVER Corp NAVER Corp is South Korea leading technology company, best known for the NAVER search engine, LINE messenger (200M+ users), SNOW app, and NAVER WEBTOON. In 2018, NAVER was ranked 9th most innovative company globally by Forbes and listed in Fortune's top 6 Future 50. NAVER Vietnam In 2021, NAVER expanded into Vietnam to tap into the country's growing Information Technology market by initially partnering with two leading universities in Hanoi. Later that year, the NAVER Vietnam Development Center (NVDC) was established in two major cities: Ho Chi Minh City and Hanoi. With rapid growth, NAVER Vietnam is currently delivering a range of large-scale services, including NAVER Financial (Npay), NAVER Clip, Weverse, NAVER WORKS, and other Global NAVER platforms. Upholding the core values of Autonomy Challenge Teamwork, the company is committed to becoming one of Asia most advanced development centers. In both 2023 and 2025, NAVER Vietnam was honored as the Best IT Company in Viet Nam by ITViec.com — a remarkable milestone that reflects its rapid growth and innovation. Learn more about us: https://navercorp.vn/ We are looking for Fullstack Engineers (Intern Level). Your Daily Task Develop Visual Dashboard using AI. Develop Automation QA Framework using AI. Your Background Pursuing a Bachelor's degree with a focus on subjects in software development or other technical related fields. Experience in HTML, CSS, JS. Experience in React, Next.js Familiar with Data Structures, Algorithms. It's a Big Plus If You A strong plus, experience in AI, MCP. From Solid Welfare Programs To Autonomy Over Working Time And Place, We Create The Culture In Which We Work. By Joining NAVER VIETNAM, You Will Be Involved In Competitive income package: Comprehensive package with full salary insurance, 13th month salary, annual performance appraisals, and incentive bonuses. Learning and development opportunities: Monthly book allowance and an annual budget for online/offline courses (Udemy, Coursera, etc.) in tech, languages, and soft skills,... Protecting and enhancing healthcare plan for you and your family: Premium insurance for employees and 2 family members, plus annual health check-ups. Employee's engagement activities: Respectful, engaging culture with monthly team budgets, social clubs, and celebration gifts. Working environment: Driven by Autonomy Challenge Teamwork values, with talented colleagues, supportive leaders, and modern devices supported such as Macbook Pro 14, Macbook Air 14, Dell 7450 Ultra 7,... Dedication bonus: Recognizing your commitment and contributions with special bonuses and benefits at key work milestones. Other benefits: Home office setup allowance, happy hours, attractive referral bonus, and more! By applying to NAVER Vietnam, the candidate confirms that all information provided is true and correct. Any false or misleading information may result in disqualification from the recruitment process or termination of employment if discovered later. By clicking “Submit Application,” you agree to allow NAVER Vietnam to process your personal data in accordance with our Data Policy. This includes storing, reviewing, and sharing your information with relevant parties involved in the recruitment process",
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