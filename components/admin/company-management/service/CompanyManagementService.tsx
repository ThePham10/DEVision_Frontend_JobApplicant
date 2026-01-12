import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { Company } from "../types";
import { COMPANY_ADMIN_URL } from "@/config/URLConfig";

export async function loadCompanies(searchTerm: string | null): Promise<Company[]> {
    try {
        const response = await jmHttpHelper.get<Company[]>(`${COMPANY_ADMIN_URL}?search=${searchTerm}`);
        console.log("Loaded companies:", response.data);
        return response.data ?? [];
    } catch (error) {
        console.error("Error loading companies:", error);
        throw error;
    }
}