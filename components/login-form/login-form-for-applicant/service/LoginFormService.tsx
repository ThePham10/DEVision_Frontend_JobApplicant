import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { LoginData, UserData } from "@/components/login-form/types/types"

const loginUser = async (data: LoginData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>("/auth/applicant/login", data);

    return response;
}

export default loginUser;