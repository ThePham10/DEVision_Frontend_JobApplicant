import { httpHelper } from "@/utils/httpHelper";
import { RegisterData, UserData } from "@/components/register-form/types/types"
import { REGISTER_URL } from "@/config/URLConfig";

interface RegisterResult {
    success: boolean;
    data?: UserData;
    error?: string;
}
const registerUser = async (data: RegisterData): Promise<RegisterResult> => {
    try {
        const response = await httpHelper.post<UserData>(REGISTER_URL, data);
        
        if (response.status === 201) {
            const userData = response.data;
            return { success: true, data: userData}
        }
        
        return { success: false, error: "Registration failed" };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
};

export default registerUser;
