import { create } from "zustand";
import { Skill } from "@/components/admin/skill-management/types";
import { JobCategory } from "@/components/admin/job-category-management/types";

// Define the data store interface
interface DataStore {
    skills: Skill[];
    jobCategories: JobCategory[];
    setSkills: (skills: Skill[]) => void;
    setJobCategories: (jobCategories: JobCategory[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
    skills: [],
    jobCategories: [],
    setSkills: (skills: Skill[]) => set({ skills }),
    setJobCategories: (jobCategories: JobCategory[]) => set({ jobCategories }),
}))