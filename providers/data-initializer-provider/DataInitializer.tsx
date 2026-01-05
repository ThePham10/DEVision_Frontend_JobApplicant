"use client"

import { useDataStore } from "@/store/dataStore";
import { useEffect } from "react";
import { loadJobCategoriesData, loadSkillsData } from "./service/DataInitializerService";

export const DataInitializer = ({ children }: { children: React.ReactNode }) => {
    const { setSkills, setJobCategories } = useDataStore();
    
    useEffect(() => {
        const loadJobCategories = async () => {
            const jobCategories = await loadJobCategoriesData();
            setJobCategories(jobCategories);
        }

        const loadSkills = async () => {
            const skills = await loadSkillsData();
            setSkills(skills);
        }

        loadJobCategories();
        loadSkills();
    }, [setJobCategories, setSkills])
    
    return children;
}