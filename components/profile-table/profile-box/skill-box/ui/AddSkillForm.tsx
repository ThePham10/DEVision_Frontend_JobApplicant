"use client";

import { HeadlessForm, FormConfig } from "@/components/headless-form";
import { SecondaryButton } from "@/components/reusable-component";
import { useDataStore } from "@/store/dataStore";

interface AddEducationFormProps {
    //onSubmit: (data: { name: string; description?: string; }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddSkillForm({ onCancel, isLoading = false }: AddEducationFormProps) {
    const { skills } = useDataStore()

    const formConfig: FormConfig = {
        children: [
            {
                title: "Name",
                name: "name",
                type: "select",
                options: skills,
                multiple: true,
                placeholder: "e.g., JavaScript, Python, React, Node.js",
                colSpan: 1,
            },
            
        ],
        buttonText: isLoading ? "Saving..." : "Add New Skill",
        layout: {
            type: "flex",
            direction: "column",
        },
    };

    return (
        <div className="space-y-4">
            <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)} />
            <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
        </div>
    );
}
