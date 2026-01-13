import { httpHelper, ApiResponse } from "@/utils/httpHelper";   
import { UserData } from "@/components/register-form/types/types"
import { authUserWithGoogleAccountData } from "../type/types";

/**
 * Function to authenticate or register a user using Google account
 * @param - Data from Google authentication
 * @returns - user data from API
 */
const authUserWithGoogleAccount = async (data: authUserWithGoogleAccountData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>("/auth/applicant/firebase/google", data);

    return response;
}

export default authUserWithGoogleAccount;