import { httpHelper } from "@/utils/httpHelper";
import { CHANGE_PASSWORD_URL } from "@/config/URLConfig";

// Define the data type for changing password
export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

// Define the result type for changing password
interface ChangePasswordResult {
    success: boolean;
    message?: string;
    error?: string;
}

/** 
* Function to change the user's password
* @param - current and new passwords
* @returns - success status and message or error
*/
const changePassword = async (data: ChangePasswordData): Promise<ChangePasswordResult> => {
    try {
        const response = await httpHelper.post<{ message: string }>(CHANGE_PASSWORD_URL, data);
        
        if (response.status === 200 || response.status === 201) {
            return { success: true, message: response.data.message };
        }
        
        return { success: false, error: "Failed to change password" };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
};

export default changePassword;