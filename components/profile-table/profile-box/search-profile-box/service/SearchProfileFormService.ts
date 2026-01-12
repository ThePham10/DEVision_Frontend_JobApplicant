import { httpHelper } from "@/utils/httpHelper";
import { SEARCH_PROFILE_URL } from "@/config/URLConfig";
import { SearchProfile } from "../type";

/**
 * Create a new search profile
 * @param data 
 * @returns void
 */
export async function createSearchProfile(data: SearchProfile) {
    try {
        const response = await httpHelper.post<string>(SEARCH_PROFILE_URL, data)

        if (response.status === 201 || response.status === 200) {
            return response;
        }
        return response;
    } catch (error) {
        throw new Error("Failed to create search profile! " + error);
    }
}

/**
 * Get the current user's search profile
 * @returns SearchProfile
 */
export async function getSearchProfile() {
    try {
        const response = await httpHelper.get<SearchProfile>(SEARCH_PROFILE_URL + "/me")

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error("Failed to get search profile! " + error);
    }
}