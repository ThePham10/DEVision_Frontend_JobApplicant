import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { RegisterData, UserData } from "@/components/register-form/types/types"

const registerUserWithGoogleAccount = async (data: RegisterData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>("/auth/applicant/register", data);

    return response;
}

export default registerUserWithGoogleAccount;
