"use client";

import { Education } from "../../../types/types";
import { HeadlessForm } from "@/components/headless-form/Form";
import { FormConfig } from "@/components/headless-form/types/types";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";

interface AddWorkExpFormProps {
    //onSubmit: (data: { name: string; description?: string; }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddWorkExpForm({ onCancel, isLoading = false }: AddWorkExpFormProps) {
    const formConfig: FormConfig = {
        children: [
            {
                title: "Job Title",
                name: "jobTitle",
                type: "text",
                placeholder: "e.g., Software Engineer, Product Manager",
                colSpan: 1,
            },
            {
                title: "Start Date",
                name: "startDate",
                type: "text",
                placeholder: "e.g., 2015",
                colSpan: 1,
            },
            {
                title: "End Date",
                name: "endDate",
                type: "text",
                placeholder: "e.g., 2019 or Present",
                colSpan: 1,
            },
            {
                title: "Job Description",
                name: "jobDescription",
                type: "text",
                placeholder: "e.g., Developed software applications, managed product teams",
                colSpan: 1,
            },
        ],
        buttonText: isLoading ? "Saving..." : "Add New Work Experience",
        layout: {
            type: "flex",
            direction: "column",
            gap: "2",
        },
    };

    return (
        <div className="space-y-4">
            <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)} />
            <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
        </div>
    );
}
