import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { LoginData, UserData, UserProfile } from "@/components/login-form/types/types"
import { APPLICANT_URL, LOGIN_APPLICANT_URL } from "@/config/URLConfig";

export const loginUser = async (data: LoginData): Promise<ApiResponse<UserData>> => {
    const response = await httpHelper.post<UserData>(LOGIN_APPLICANT_URL, data);

    return response;
}

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