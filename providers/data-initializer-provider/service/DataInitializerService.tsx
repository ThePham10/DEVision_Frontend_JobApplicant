import { httpHelper } from "@/utils/httpHelper";
import { JobCategory } from "@/components/admin/job-category-management/types";
import { JOB_CATEGORY_URL, SKILL_URL } from "@/config/URLConfig";
import { Skill } from "@/components/admin/skill-management/types";

/**
 * Load job categories
 */
async function loadJobCategoriesData(): Promise<JobCategory[]> {
    const response = await httpHelper.get<{ data: JobCategory[] }>(JOB_CATEGORY_URL + "?limit=" + 100);
    return response.data?.data ?? [];
}

/**
 * Load skills
 */
async function loadSkillsData(): Promise<Skill[]> {
    const response = await httpHelper.get<{ data: Skill[] }>(SKILL_URL + "?limit=" + 100);
    return response.data?.data ?? [];
}

export {
    loadJobCategoriesData,
    loadSkillsData
}