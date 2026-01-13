import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { LoginData, UserData } from "@/components/login-form/types/types"
import { LOGIN_ADMIN_URL } from "@/config/URLConfig";

/**
* Function to log in an admin user
* @param - login data (email and password)
* @returns - API response containing user data
*/
const loginAdmin = async (data: LoginData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>(LOGIN_ADMIN_URL, data);
    
    return response;
}

export default loginAdmin;