"use client"

import { useDataStore } from "@/store/dataStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadJobCategoriesData, loadSkillsData } from "./service/DataInitializerService";

export const DataInitializer = ({ children }: { children: React.ReactNode }) => {
    const { setSkills, setJobCategories } = useDataStore();
    
    // Fetch job categories with useQuery
    const { data: jobCategories } = useQuery({
        queryKey: ["job-categories"],
        queryFn: loadJobCategoriesData,
        staleTime: 1000 * 60 * 30, // Cache for 30 minutes (this data rarely changes)
    });

    // Fetch skills with useQuery
    const { data: skills } = useQuery({
        queryKey: ["skills"],
        queryFn: loadSkillsData,
        staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    });

    // Sync fetched data to the store when available
    useEffect(() => {
        if (jobCategories) {
            setJobCategories(jobCategories);
        }
    }, [jobCategories, setJobCategories]);

    useEffect(() => {
        if (skills) {
            setSkills(skills);
        }
    }, [skills, setSkills]);
    
    return children;
}
