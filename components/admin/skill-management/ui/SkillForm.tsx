"use client";

import { Skill, JobCategory } from "../types";
import { HeadlessForm } from "@/components/headless-form/Form";
import { FormConfig, FormValues } from "@/components/headless-form/types/types";
import { icons } from "@/components/reusable-component/Icon";

// Convert icons object to array format for dropdown
const iconOptions = Object.keys(icons).map((key) => ({
    id: key,
    name: key,
    icon: key,
}));

interface SkillFormProps {
    skill?: Skill | null;
    jobCategories: JobCategory[];
    onSubmit: (data: { name: string; jobCategoryId?: string; description?: string; isActive?: boolean; icon?: string }) => void;
    isLoading?: boolean;
}

export default function SkillForm({ skill, jobCategories, onSubmit}: SkillFormProps) {
    
    const isEditing = !!skill;

    const formConfig : FormConfig = {
    children: [
        {
            name: "name",
            title: "Skill Name",
            type: "text",
            placeholder: "e.g., React, Python, Docker",
            validation: {
                required: true,
            }
        },
        {
            name: "jobCategoryId",
            title: "Job Category",
            type: "select",
            placeholder: "Select a job category",
            options: jobCategories,
            validation: {
                required: true,
            }
        },
        {
            name: "icon",
            title: "Icon",
            type: "select",
            placeholder: "Select an icon",
            options: iconOptions,
            validation: {
                required: true,
            }
        },
        {
            name: "description",
            title: "Description",
            type: "textarea",
            placeholder: "Brief description of the skill...",
            validation: {
                required: true,
            }
        },
    ],
    buttonText: "Create new skill",
}
    
    const handleSubmit = (values: FormValues) => {
        const formName = String(values.name || "");
        const formJobCategoryId = String(values.jobCategoryId || "");
        const formDescription = String(values.description || "");
        const formIcon = String(values.icon || "");
        
        const submitData = isEditing
            ? { name: formName.trim(), description: formDescription.trim() || undefined, icon: formIcon.trim() || undefined }
            : { name: formName.trim(), jobCategoryId: formJobCategoryId, description: formDescription.trim() || undefined, icon: formIcon.trim() || undefined };
        
        onSubmit(submitData);
    };
    
    return (
        <>
            <div className="text-2xl font-semibold mb-6">
                Create new skill
            </div>
            <HeadlessForm
            config={formConfig}
            onSubmit={handleSubmit}/>
        </>
    );
}
