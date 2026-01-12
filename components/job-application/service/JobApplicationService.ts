import { JOB_APPLICATION_URL } from "@/config/URLConfig"
import { JobApplication, ApplicationFormData, ReturnMediaUrl, ReturnUploadingData } from "../types"
import { httpHelper } from "@/utils/httpHelper"

/**
 * Get job application by applicant id
 * @param applicantId - the applicant id
 * @returns the job application list
 */
export async function getJobApplication(applicantId: string): Promise<JobApplication[]> {
    try {
        const response = await httpHelper.get(JOB_APPLICATION_URL + "/applicant/" + applicantId);

        if (response.status === 200) {
            return response.data as JobApplication[]
        }
    } catch (error) {
        console.error("Failed to get job application:", error)
    }
    return []
}

/**
 * Submit a new application
 * @param application - the application form data that contain the cv file and cover letter file
 * @returns the job application
 */
export async function submitApplication(application: ApplicationFormData): Promise<JobApplication | null> {
    try {
        const cvUrl = await uploadCVFile(application);
        const coverLetterUrl = await uploadCoverLetterFile(application);

        // Filter out null values from failed uploads and extract just the URL strings
        const mediaUrls = [cvUrl, coverLetterUrl]
            .filter((result): result is ReturnMediaUrl => result !== null)
            .map(result => result.url);

        // Check if at least CV was uploaded (required)
        if (!cvUrl) {
            console.error("CV upload is required but failed");
            return null;
        }

        const applicationData = {
            jobId: application.jobId,
            mediaUrls: mediaUrls,
            status: "PENDING"
        }

        console.log(applicationData)

        const response = await httpHelper.post(JOB_APPLICATION_URL, applicationData);
        if (response.status === 201) {
            return response.data as JobApplication
        }
    } catch (error) {
        console.error("Failed to submit application:", error)
    }
    return null
}

/**
 * Upload the cv file
 * @param application - the application form data that contain the cv file
 * @returns the media url
 */
async function uploadCVFile(application: ApplicationFormData): Promise<ReturnMediaUrl | null> {
    const file = application.cvFile;

    if (!(file instanceof File)) {
        console.error("No CV file selected");
        return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cv");

    const response = await uploadFileToStorage(formData);
    if (response?.status === 201) {
        console.log("CV uploaded:", response.data);
        return response.data;
    }

    console.error("CV upload failed with status:", response?.status);
    return null;
}

/**
 * Upload the cover letter file
 * @param application - the application form data that contain the cover letter file
 * @returns the media url
 */
async function uploadCoverLetterFile(application: ApplicationFormData): Promise<ReturnMediaUrl | null> {
    const file = application.coverLetterFile;

    if (!(file instanceof File)) {
        console.error("No cover letter file selected");
        return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cover-letter");
    const response = await uploadFileToStorage(formData);
    if (response?.status === 201) {
        console.log("Cover letter uploaded:", response.data);
        return response.data;
    }

    console.error("Cover letter upload failed with status:", response?.status);
    return null;
}

/**
 * Upload the file to S3 bucket
 * @param data - the form data that contain the file
 * @returns the uploading data (status and file url)
 */
async function uploadFileToStorage(data: FormData): Promise<ReturnUploadingData | null> {
    try {
        const response = await httpHelper.post("/storage/upload", data);
        return response as ReturnUploadingData;
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}
