import { httpHelper } from "@/utils/httpHelper";
import { LogoutResponse } from "@/components/header/type/types"

const logoutUser = async () => {
    const response = await httpHelper.post<LogoutResponse>("/auth/applicant/logout", {});

    return response;
}

export default logoutUser;