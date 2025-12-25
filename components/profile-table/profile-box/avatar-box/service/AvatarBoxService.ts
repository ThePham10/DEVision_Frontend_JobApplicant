import { httpHelper } from "@/utils/httpHelper";

async function uploadAvatar(data: FormData) {
    try {

        const response = await httpHelper.post("/storage/upload", data);
        return response;
    } catch (error) {
        console.error("Upload failed:", error);
    }
}

export {uploadAvatar}