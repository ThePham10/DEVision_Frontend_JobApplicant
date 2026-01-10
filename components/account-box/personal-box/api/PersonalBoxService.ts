import { httpHelper, ApiResponse } from "@/utils/httpHelper";
import { User, UserData } from "@/components/login-form/types/types";
import { APPLICANT_URL } from "@/config/URLConfig";
import { useAuthStore } from "@/store/authStore";
import { AccountData } from "../types";

export const updateUserInfo = async (
    data: Partial<User>,
): Promise<ApiResponse<UserData>> => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("Not authenticated");

    if (!data || Object.keys(data).length === 0) {
        throw new Error("No update data provided");
    }

    const endpoint = `${APPLICANT_URL}/${user.id}`;
    const response = await httpHelper.put<UserData>(endpoint, data);

    return response;
};

export const getUserInfo = async (
    userId: string,
): Promise<ApiResponse<AccountData>> => {
    const endpoint = `${APPLICANT_URL}/${userId}`;
    const response = await httpHelper.get<AccountData>(endpoint);

    return response;
}