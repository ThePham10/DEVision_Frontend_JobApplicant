import { httpHelper } from "@/utils/httpHelper";

interface UploadResponse {
    url: string;
}

/**
 * Upload avatar
 * @param data - FormData containing the avatar file
 * @returns UploadResponse object containing the uploaded avatar URL
 */
async function uploadAvatar(data: FormData) {
    try {
        const response = await httpHelper.post<UploadResponse>("/storage/upload", data);
        return response;
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}

export { uploadAvatar, type UploadResponse };