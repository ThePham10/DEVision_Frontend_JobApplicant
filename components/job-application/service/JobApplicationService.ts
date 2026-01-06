import { JobApplication, JobApplicationStatus, PaginatedJobApplicationResponse, JobApplicationFilters, ApplicationFormData } from "../types"
import { httpHelper } from "@/utils/httpHelper"

// Mock data for development - will be replaced with real API calls
const mockJobApplications: JobApplication[] = [
    {
        id: "app-1",
        jobId: "1",
        jobTitle: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "Ho Chi Minh City, Vietnam",
        appliedAt: new Date("2025-12-20"),
        status: JobApplicationStatus.PENDING,
        coverLetter: "I am very interested in this position...",
        cvFileName: "john_doe_cv.pdf"
    },
    {
        id: "app-2",
        jobId: "2",
        jobTitle: "Backend Developer",
        company: "StartupXYZ",
        location: "Ha Noi, Vietnam",
        appliedAt: new Date("2025-12-15"),
        status: JobApplicationStatus.ACCEPTED,
        coverLetter: "I have 3 years of experience...",
        cvFileName: "john_doe_cv.pdf"
    },
    {
        id: "app-3",
        jobId: "3",
        jobTitle: "Frontend Developer",
        company: "Digital Agency",
        location: "Da Nang, Vietnam",
        appliedAt: new Date("2025-12-10"),
        status: JobApplicationStatus.REJECTED,
        coverLetter: "I am passionate about frontend...",
        cvFileName: "john_doe_cv.pdf"
    }
]

/**
 * Submit a new job application
 * @param formData - Application form data with CV file
 * @returns Promise with the created application
 */
export async function submitApplication(formData: ApplicationFormData): Promise<JobApplication> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const cvFileURL = await uploadCVFile(formData)
    if (!cvFileURL) {
        throw new Error("Failed to upload CV file")
    }

    let coverLetterFileURL: string | undefined;
    if (formData.coverLetterFile) {
        coverLetterFileURL = await uploadCoverLetterFile(formData)
    }

    // In production, this would upload the CV and create the application via API
    // For now, create a mock application
    const newApplication: JobApplication = {
        id: `app-${Date.now()}`,
        jobId: formData.jobId,
        jobTitle: "Job Title", 
        company: "Company Name", 
        location: "Location", 
        appliedAt: new Date(),
        status: JobApplicationStatus.PENDING,
        coverLetter: coverLetterFileURL,
        cvFileName: cvFileURL
    }

    // Add to mock array
    mockJobApplications.unshift(newApplication)

    return newApplication
}

/**
 * Fetch job applications for the current user
 * @param page - Page number (1-indexed)
 * @param limit - Number of items per page
 * @param filters - Optional filters for status
 * @returns Promise with paginated job applications
 */
export async function getMyApplications(
    page: number,
    limit: number,
    filters?: JobApplicationFilters
): Promise<PaginatedJobApplicationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Apply filters
    let filteredItems = [...mockJobApplications]

    if (filters?.status) {
        filteredItems = filteredItems.filter(app => app.status === filters.status)
    }

    // Sort by appliedAt date (newest first)
    filteredItems.sort((a, b) => b.appliedAt.getTime() - a.appliedAt.getTime())

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
 * Check if user has already applied for a job
 * @param jobId - Job ID to check
 * @returns Promise with boolean
 */
export async function hasApplied(jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockJobApplications.some(app => app.jobId === jobId)
}

async function uploadCVFile(application: ApplicationFormData): Promise<string | undefined> {
    const file = application.cvFile;
    
    if (!(file instanceof File)) {
        console.error("No file selected");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cv");

    const response = await uploadFileToStorage(formData);
    if (response?.status === 201) {
        return response.data as string;
    }
}

async function uploadCoverLetterFile(application: ApplicationFormData): Promise<string | undefined> {
    const file = application.coverLetterFile!;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cover-letter");
    const response = await uploadFileToStorage(formData);
    if (response?.status === 201) {
        return response.data as string;
    }
}

async function uploadFileToStorage(data: FormData) {
    try {

        const response = await httpHelper.post("/storage/upload", data);
        return response;
    } catch (error) {
        console.error("Upload failed:", error);
    }
}
