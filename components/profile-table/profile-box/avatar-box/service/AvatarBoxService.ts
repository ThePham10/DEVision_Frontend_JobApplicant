import { httpHelper } from "@/utils/httpHelper";

interface UploadResponse {
    url: string;
}

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