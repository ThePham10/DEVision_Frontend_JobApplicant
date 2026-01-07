import { httpHelper } from "@/utils/httpHelper";
import { SEARCH_PROFILE_URL } from "@/config/URLConfig";
import { SearchProfile } from "../type";

export async function createSearchProfile(data: SearchProfile) {
    try {
        const response = await httpHelper.post<string>(SEARCH_PROFILE_URL, data)

        if (response.status === 200) {
            return;
        }
    } catch (error) {
        throw new Error("Failed to create search profile! ");
    }
}

export async function getSearchProfile() {
    try {
        const response = await httpHelper.get<SearchProfile>(SEARCH_PROFILE_URL + "/me")

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error("Failed to get search profile! ");
    }
}