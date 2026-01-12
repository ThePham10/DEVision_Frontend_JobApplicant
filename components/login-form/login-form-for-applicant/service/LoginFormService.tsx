import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { LoginData, UserData, UserProfile } from "@/components/login-form/types/types"
import { APPLICANT_URL, LOGIN_APPLICANT_URL } from "@/config/URLConfig";

/**
* Function to log in an applicant user
* @param - login data (email and password)
* @returns - API response containing user data
*/
export const loginUser = async (data: LoginData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>(LOGIN_APPLICANT_URL, data);

    return response;
}

/**
* Function to get the user's profile by ID
* @param - user ID
* @returns - user profile data or null/undefined on error
*/
export const getUserProfile = async (id: string): Promise<UserProfile | null | undefined> => {
    try {
        const response = await httpHelper.get<UserProfile>(APPLICANT_URL + "/" + id);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}