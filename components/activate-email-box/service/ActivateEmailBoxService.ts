import { APPLICANT_URL } from "@/config/URLConfig";
import { httpHelper } from "@/utils/httpHelper";

type Response = {
    message: string;
}

export async function activateEmail(token: string) {
    try {
        const response = await httpHelper.get<Response>(`${APPLICANT_URL}/activate-email?token=${token}`);
        return response;
    } catch (error) {
        console.error("Error activating email:", error);
        return { status: 500, data: { message: "Failed to activate email." } };
    }
}