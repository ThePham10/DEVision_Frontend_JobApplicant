import { httpHelper } from "@/utils/httpHelper";
import { LogoutResponse } from "@/components/header/type/types"

/**
 * Function to log out the user
 * @returns - logout response - string message from API
 */
const logoutUser = async () => {
    const response = await httpHelper.post<LogoutResponse>("/auth/applicant/logout", {});

    return response;
}

export default logoutUser;