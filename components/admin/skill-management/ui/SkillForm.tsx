"use client";

import { Skill, JobCategory } from "../types";
import { HeadlessForm, FormConfig, FormValues } from "@/components/headless-form";
import { icons } from "@/components/reusable-component";

// Convert icons object to array format for dropdown
const iconOptions = Object.keys(icons).map((key) => ({
    id: key,
    name: key,
    icon: key,
}));

// Define skill form props
interface SkillFormProps {
    skill?: Skill | null;
    jobCategories: JobCategory[];
    onSubmit: (data: { name: string; jobCategoryId?: string; description?: string; isActive?: boolean; icon?: string }) => void;
    isLoading?: boolean;
}

/**
 * Skill form component
 * @param skill - The skill to edit
 * @param jobCategories - The job categories to display
 * @param onSubmit - The function to call when the form is submitted
 * @returns The skill form component
 */
export default function SkillForm({ skill, jobCategories, onSubmit}: SkillFormProps) {
    
    // Check if editing
    const isEditing = !!skill;

    // Form config - conditionally include jobCategoryId only when creating
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
        // Only show job category field when creating new skill
        !isEditing && {
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
    ].filter(Boolean) as FormConfig["children"], // Filter out false values
    buttonText: isEditing ? "Update Skill" : "Create New Skill",
}

    // Initial values for editing
    const initialValues: FormValues = {
        name: skill?.name || "",
        icon: skill?.icon || "",
    };
    
    // Handle submit
    const handleSubmit = (values: FormValues) => {
        // Get form values
        const formName = String(values.name || "");
        const formJobCategoryId = String(values.jobCategoryId || "");
        const formIcon = String(values.icon || "");
        
        // Submit data
        const submitData = isEditing
            ? { name: formName.trim(), icon: formIcon.trim() || undefined }
            : { name: formName.trim(), jobCategoryId: formJobCategoryId, icon: formIcon.trim() || undefined };
        
        // Send the request
        onSubmit(submitData);
    };
    
    return (
        <>
            <div className="text-2xl font-semibold mb-6">
                {isEditing ? "Edit Skill" : "Create New Skill"}
            </div>
            <HeadlessForm
            config={formConfig}
            initialValues={initialValues}
            onSubmit={handleSubmit}/>
        </>
    );
}

