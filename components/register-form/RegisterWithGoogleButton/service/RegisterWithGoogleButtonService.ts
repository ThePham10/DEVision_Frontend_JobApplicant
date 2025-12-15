import { httpHelper, ApiResponse } from "@/utils/httpHelper";   
import { registerUserWithGoogleAccountData, UserData } from "@/components/register-form/types/types"

const registerUser = async (data: registerUserWithGoogleAccountData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>("/auth/applicant/firebase/google", data);

    return response;
}

export default registerUser;