import { useDataStore } from "@/store/dataStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FormConfig } from "@/components/headless-form/types/types";

const useSearchProfileForm = () => {
    const { skills } = useDataStore();
    const { isPremium } = useAuthStore();
    const router = useRouter()

    const formConfig: FormConfig = {
        children: [
            // 5.2.2 - Technical background as tags
            {
                name: "technicalBackground",
                title: "Technical Background",
                type: "select",
                options: skills,
                multiple: true,
                placeholder: "Select skills",
                colSpan: 1
            },
            // 5.2.3 - Employment status as multiple selections
            {
                name: "employmentStatus",
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
                name: "country",
                title: "Country",
                type: "country",
                placeholder: "Select country",
            },
            // 5.2.1 - Semicolon-separated job titles
            {
                name: "jobTitles",
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
        buttonText: "Save Search Profile",
        layout: {
            type: "grid",
            columns: 4,
            gap: "6",
        },
    }

    const handleSubmit = (data: Record<string, unknown>) => {
        if (!isPremium) return; // Prevent submission for non-premium users
        console.log("Search Profile Data:", data);
        // TODO: Send to backend API
    }

    return {
        isPremium,
        router,
        formConfig,
        handleSubmit
    }
}

export default useSearchProfileForm