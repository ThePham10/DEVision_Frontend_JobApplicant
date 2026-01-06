import { httpHelper } from "@/utils/httpHelper";
import { RegisterData, UserData } from "@/components/register-form/types/types"
import { APPLICANT_URL, REGISTER_URL } from "@/config/URLConfig";

interface RegisterResult {
    success: boolean;
    emailSent: boolean;
    data?: UserData;
    error?: string;
}
const registerUser = async (data: RegisterData): Promise<RegisterResult> => {
    try {
        const response = await httpHelper.post<UserData>(REGISTER_URL, data);
        if (response.status !== 201) {
            return { success: false, emailSent: false, error: "Registration failed" };
        }
        const userData = response.data;
        
        // Attempt to send verification email
        try {
            const sendEmailResponse = await httpHelper.post<void>(
                `${APPLICANT_URL}/${userData.user.id}/send-verification-email`, 
                {}
            );
            return { 
                success: true, 
                emailSent: sendEmailResponse.status === 200, 
                data: userData
            };
        } catch {
            // Registration succeeded but email failed
            return { success: true, emailSent: false, data: userData };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, emailSent: false, error: message };
    }
};

export default registerUser;
