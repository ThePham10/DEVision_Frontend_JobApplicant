import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { Company } from "../types";
import { COMPANY_ADMIN_URL } from "@/config/URLConfig";

async function loadCompanies(): Promise<Company[]> {
    try {
        // Per API docs, use search=null to get all companies
        const response = await jmHttpHelper.get<Company[]>(`${COMPANY_ADMIN_URL}?search`);
        console.log("Loaded companies:", response.data);
        return response.data ?? [];
    } catch (error) {
        console.error("Error loading companies:", error);
        throw error;
    }
}

export { loadCompanies };
