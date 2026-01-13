import { jmHttpHelper } from "@/utils/jmhttpHelper";
import { Company } from "../types";
import { COMPANY_ADMIN_URL, COMPANY_ADMIN_DELETE_URL } from "@/config/URLConfig";

/**
* Function to load companies with optional search term
* @param - search term
* @returns - list of companies
*/
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

/**
* Function to delete a company by ID
* @param - company ID
* @returns - void
*/
export async function deleteCompanyById(companyId: string): Promise<void> {
    try {
        await jmHttpHelper.delete(`${COMPANY_ADMIN_DELETE_URL}/${companyId}`);
        console.log(`Company with ID ${companyId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting company with ID ${companyId}:`, error);
        throw error;
    }
}
