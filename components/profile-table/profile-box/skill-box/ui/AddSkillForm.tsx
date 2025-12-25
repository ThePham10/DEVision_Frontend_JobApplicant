"use client";

import { HeadlessForm } from "@/components/headless-form/Form";
import { FormConfig } from "@/components/headless-form/types/types";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";

interface AddEducationFormProps {
    //onSubmit: (data: { name: string; description?: string; }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddSkillForm({ onCancel, isLoading = false }: AddEducationFormProps) {
    const formConfig: FormConfig = {
        children: [
            {
                title: "Name",
                name: "name",
                type: "text",
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
