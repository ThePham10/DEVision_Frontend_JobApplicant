import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { APPLICANT_URL } from "@/config/URLConfig";

interface ResendEmailData {
    email: string;
}

/**
 * Resend verification email to the user
 * @param data - { email: string }
 */
export const resendVerificationEmail = async (data: ResendEmailData): Promise<ApiResponse<unknown>> => {
    return await httpHelper.post<unknown>(`${APPLICANT_URL}/send-email`, data);
}
