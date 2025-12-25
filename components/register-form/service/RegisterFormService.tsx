import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { RegisterData, UserData } from "@/components/register-form/types/types"
import { REGISTER_URL } from "@/config/URLConfig";

const registerUser = async (data: RegisterData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>(REGISTER_URL, data);

    return response;
}

export default registerUser;
