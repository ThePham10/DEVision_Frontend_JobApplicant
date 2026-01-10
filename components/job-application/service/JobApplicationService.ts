import { JOB_APPLICATION_URL } from "@/config/URLConfig"
import { JobApplication, ApplicationFormData, ReturnMediaUrl, ReturnUploadingData } from "../types"
import { httpHelper } from "@/utils/httpHelper"

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

async function uploadFileToStorage(data: FormData): Promise<ReturnUploadingData | null> {
    try {
        const response = await httpHelper.post("/storage/upload", data);
        return response as ReturnUploadingData;
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}
