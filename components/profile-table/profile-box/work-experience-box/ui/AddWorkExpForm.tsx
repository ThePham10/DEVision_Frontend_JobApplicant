"use client";

import { HeadlessForm, FormConfig, FormValues } from "@/components/headless-form";
import { SecondaryButton } from "@/components/reusable-component";
import { WorkExpData } from "../types";

interface AddWorkExpFormProps {
    onSubmit: (data: Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddWorkExpForm({ onSubmit, onCancel, isLoading = false }: AddWorkExpFormProps) {

    const handleSubmit = (values: FormValues) => {
        const data: Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt"> = {
            title: String(values.title || ""),
            description: String(values.description || ""),
            startDate: String(values.startDate || ""),
            endDate: String(values.endDate || ""),
        };
        onSubmit(data);
    };

    const formConfig: FormConfig = {
        children: [
            {
                title: "Job Title",
                name: "title",
                type: "text",
                placeholder: "Enter job title",
                colSpan: 2,
            },
            {
                title: "Start Date",
                name: "startDate",
                type: "date",
                placeholder: "",
                colSpan: 2,
            },
            {
                title: "End Date",
                name: "endDate",
                type: "date",
                placeholder: "",
                colSpan: 2,
            },
            {
                title: "Job Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter job description",
                colSpan: 2,
            },
        ],
        buttonText: isLoading ? "Saving..." : "Add Work Experience",
        layout: {
            type: "grid",
            columns: 2,
            gap: "4",
        },
    };

    return (
        <div className="space-y-4">
            <HeadlessForm config={formConfig} onSubmit={handleSubmit} />
            <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
        </div>
    );
}
