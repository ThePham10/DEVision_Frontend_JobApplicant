"use client";

import { HeadlessForm, FormConfig } from "@/components/headless-form";
import { SecondaryButton } from "@/components/reusable-component";

interface AddEducationFormProps {
    //onSubmit: (data: { name: string; description?: string; }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddEducationForm({ onCancel, isLoading = false }: AddEducationFormProps) {
    const formConfig: FormConfig = {
        children: [
            {
                title: "School",
                name: "school",
                type: "text",
                placeholder: "e.g., Harvard University, MIT, Stanford",
                colSpan: 1,
            },
            {
                title: "Degree",
                name: "degree",
                type: "text",
                placeholder: "e.g., Bachelor, Master, PhD",
                colSpan: 1,
            },
            {
                title: "Field of Study",
                name: "fieldOfStudy",
                type: "text",
                placeholder: "e.g., Computer Science, Business, Engineering",
                colSpan: 1,
            },
            {
                title: "Start Year",
                name: "startYear",
                type: "text",
                placeholder: "e.g., 2015",
                colSpan: 1,
            },
            {
                title: "End Year",
                name: "endYear",
                type: "text",
                placeholder: "e.g., 2019 or Present",
                colSpan: 1,
            },
            {
                title: "GPA",
                name: "gpa",
                type: "text",
                placeholder: "e.g., 3.8",
                colSpan: 1,
            },
        ],
        buttonText: isLoading ? "Saving..." : "Add New Education",
        layout: {
            type: "flex",
            direction: "column",
            gap: "4",
        },
    };

    return (
        <div className="space-y-4">
            <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)} />
            <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
        </div>
    );
}
