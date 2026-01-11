import { useDataStore } from "@/store/dataStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FormConfig, FormValues } from "@/components/headless-form";
import { createSearchProfile, getSearchProfile } from "../service/SearchProfileFormService";
import { SearchProfile } from "../type";
import { useEffect, useState } from "react";

/**
 * Custom hook for search profile form
 * @returns form configuration, initial values, and loading status
 */
const useSearchProfileForm = () => {
    // State for initial search profile 
    const [initialSearchProfile, setInitialSearchProfile] = useState<SearchProfile | null>(null)

    // State for loading status
    const [isProfileLoaded, setIsProfileLoaded] = useState(false)

    // Get skills from stores
    const { skills } = useDataStore();

    // Get user profile from store
    const { userProfile } = useAuthStore();

    // Get router
    const router = useRouter()

    // Fetch existing search profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getSearchProfile();
                if (data) {
                    setInitialSearchProfile(data);
                }
            } catch (error) {
                // No existing profile, that's fine
                console.log("No existing search profile found" + error);
            } finally {
                setIsProfileLoaded(true);
            }
        };

        fetchProfile();
    }, [])

    // Transform server data back to form format for editing
    const getInitialValues = (): FormValues => {
        if (!initialSearchProfile) return {};

        return {
            // Join roles back into semicolon-separated string
            desiredRoles: initialSearchProfile.desiredRoles.join('; '),
            // Use skill IDs for the select field
            skills: initialSearchProfile.skillIds,
            // Employment types need to be lowercase with hyphens
            employmentTypes: initialSearchProfile.employmentTypes.map(
                type => type.toLowerCase().replace('_', '-')
            ),
            // First location (form takes single value, wraps in array on submit)
            desiredLocations: initialSearchProfile.desiredLocations[0] || '',
            // Salary range fields
            salary_min: String(initialSearchProfile.expectedSalary.min),
            salary_max: String(initialSearchProfile.expectedSalary.max),
        };
    };

    // Get initial values for form
    const initialValues = getInitialValues();

    // Form configuration
    const formConfig: FormConfig = {
        children: [
            // 5.2.2 - Technical background as tags
            {
                name: "skills",
                title: "Technical Background",
                type: "select",
                options: skills,
                multiple: true,
                placeholder: "Select skills",
                colSpan: 1
            },
            // 5.2.3 - Employment status as multiple selections
            {
                name: "employmentTypes",
                title: "Employment Status",
                type: "multi-checkbox",
                placeholder: "",
                options: [
                    { id: "full-time", name: "Full-time" },
                    { id: "part-time", name: "Part-time" },
                    { id: "fresher", name: "Fresher" },
                    { id: "internship", name: "Internship" },
                    { id: "contract", name: "Contract" }
                ],
            },
            // 5.2.1 - Country
            {
                name: "desiredLocations",
                title: "Country",
                type: "country",
                placeholder: "Select country",
                returnType: "label"
            },
            // 5.2.1 - Semicolon-separated job titles
            {
                name: "desiredRoles",
                title: "Desired Job Titles",
                type: "text",
                placeholder: "Software Engineer; Backend Developer;",
            },
            // 5.2.4 - Salary range with min and max
            {
                name: "salary",
                title: "Salary Range",
                type: "dual-range",
                placeholder: "",
                min: 0,
                max: 200000,
                step: 1000,
            }
        ],
        // Form button text
        buttonText: "Save Search Profile",

        // Form layout
        layout: {
            type: "grid",
            columns: 4,
            gap: "6",
        },
    }

    // Transform form data to match the server's expected format
    const transformFormData = (data: Record<string, unknown>) => {
        // Parse semicolon-separated job titles into array
        const desiredRoles = typeof data.desiredRoles === 'string'
            ? data.desiredRoles.split(';').map(s => s.trim()).filter(Boolean)
            : [];

        // Extract skill IDs and names from selected skills
        const selectedSkills = (data.skills ?? []) as string[];

        // Transform selected skills to IDs
        const skillIds = selectedSkills;

        // Transform employment types to uppercase format
        const employmentTypes = Array.isArray(data.employmentTypes)
            ? data.employmentTypes.map((type: string) => type.toUpperCase().replace('-', '_'))
            : [];

        // Handle location - wrap in array if single value
        const desiredLocations = [data.desiredLocations as string]

        // Parse salary range from dual-range input
        const expectedSalary = {
            min: Number(data.salary_min) ?? 0,
            max: Number(data.salary_max) ?? 0,
            currency: "USD"
        };

        return {
            desiredRoles,
            skillIds,
            desiredLocations,
            expectedSalary,
            employmentTypes,
        };
    };

    // Handle form submission
    const handleSubmit = (data: Record<string, unknown>) => {
        if (!userProfile?.isPremium) return; // Prevent submission for non-premium users

        // Transform form data to match the server's expected format
        const transformedData: SearchProfile = transformFormData(data);

        // Create search profile
        createSearchProfile(transformedData);
    }

    return {
        userProfile,
        router,
        formConfig,
        handleSubmit,
        initialValues,
        isProfileLoaded
    }
}

export default useSearchProfileForm