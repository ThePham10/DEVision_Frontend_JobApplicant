import { httpHelper } from "@/utils/httpHelper";
import { RegisterData, UserData } from "@/components/register-form/types/types"
import { REGISTER_URL } from "@/config/URLConfig";

// Interface for the register request result
interface RegisterResult {
    success: boolean;
    data?: UserData;
    error?: string;
}

// Function for send the request with the register data to the server
const registerUser = async (data: RegisterData): Promise<RegisterResult> => {
    try {
        // Send the request with the register data to the server
        const response = await httpHelper.post<UserData>(REGISTER_URL, data);
        
        // Check whether the request is successfull or not then return the result
        if (response.status === 201) {
            const userData = response.data;
            return { success: true, data: userData}
        }
        
        // Return the error if the request is not successfull
        return { success: false, error: "Registration failed" };
    } catch (error) {
        // Return the error if the request is not successfull
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
};

export default registerUser;
