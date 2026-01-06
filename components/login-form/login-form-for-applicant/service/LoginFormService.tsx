import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { LoginData, UserData } from "@/components/login-form/types/types"
import { LOGIN_APPLICANT_URL } from "@/config/URLConfig";

const loginUser = async (data: LoginData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>(LOGIN_APPLICANT_URL, data);

    return response;
}

export default loginUser;