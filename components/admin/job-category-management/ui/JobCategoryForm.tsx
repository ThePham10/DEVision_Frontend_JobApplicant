"use client";

import { JobCategory } from "../types";
import { HeadlessForm , FormConfig, FormValues} from "@/components/headless-form";
import { SecondaryButton, icons } from "@/components/reusable-component";

interface JobCategoryFormProps {
    category?: JobCategory | null;
    onSubmit: (data: { name: string; description?: string; icon?: string; }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

// Convert icons object to array format for dropdown
const iconOptions = Object.keys(icons).map((key) => ({
    id: key,
    name: key,
    icon: key,
}));

export default function JobCategoryForm({ category, onSubmit, onCancel, isLoading = false }: JobCategoryFormProps) {
    const isEditing = !!category;
    
    // Form configuration using HeadlessForm pattern
    const formConfig: FormConfig = {
        children: [
            {
                title: "Category Name",
                name: "name",
                type: "text",
                placeholder: "e.g., Frontend, Backend, DevOps",
                validation: {
                    required: true,
                    requiredMessage: "Category name is required",
                    minLength: 2,
                    maxLength: 50,
                },
                colSpan: 1,
            },
            {
                title: "Description",
                name: "description",
                type: "text",
                placeholder: "Brief description of this category...",
                colSpan: 1,
            },
            {
                title: "Icon",
                name: "icon",
                type: "select",
                options: iconOptions,
                placeholder: "Select an icon",
                colSpan: 1,
            }
        ],
        buttonText: isLoading ? "Saving..." : isEditing ? "Update Category" : "Add Category",
        layout: {
            type: "flex",
            direction: "column",
            gap: "4",
        },
        formClassName: "",
    };
    
    // Handle form submission
    const handleFormSubmit = (formData: FormValues) => {
        onSubmit({
            name: formData.name as string,
            description: (formData.description as string) || undefined,
            icon: formData.icon as string || undefined,
        });
    };
    
    // Build initial values from category prop
    const initialValues: FormValues = {
        name: category?.name || "",
        description: category?.description || "",
        icon: category?.icon || "",
    };
    
    return (
        <div className="space-y-4">
            <div className="text-2xl font-semibold mb-6">
                Create new job category
            </div>

            <HeadlessForm
                key={category?.id ?? "new"}
                config={formConfig}
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
            />
            
            {/* Cancel button - HeadlessForm doesn't support cancel natively */}
            <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
        </div>
    );
}
