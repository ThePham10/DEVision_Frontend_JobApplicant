"use client";

import { HeadlessForm, FormConfig, FormValues } from "@/components/headless-form";
import { Modal, SecondaryButton } from "@/components/reusable-component";
import { WorkExpData } from "../types";

interface EditWorkExpFormProps {
    item: WorkExpData;
    onSubmit: (data: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">>) => void;
    isLoading?: boolean;
    isOpen?: boolean;
    onCancel?: () => void;
}

export default function EditWorkExpModal({ item, onSubmit, isOpen, onCancel, isLoading = false }: EditWorkExpFormProps) {

    // Format date to YYYY-MM-DD for date input default value
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Handle form submission
    const handleFormSubmit = (values: FormValues) => {
        const updateData: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">> = {};
        
        if (values.title) updateData.title = values.title as string;
        if (values.startDate) updateData.startDate = values.startDate as string;
        if (values.endDate) updateData.endDate = values.endDate as string;
        if (values.description) updateData.description = values.description as string;
        
        onSubmit(updateData);
    };

    // Define form configuration
    const formConfig: FormConfig = {
        children: [
            {
                title: "Job Title",
                name: "title",
                type: "text",
                placeholder: "Enter job title",
                colSpan: 1,
            },
            {
                title: "Start Date",
                name: "startDate",
                type: "date",
                placeholder: "",
                colSpan: 1,
            },
            {
                title: "End Date",
                name: "endDate",
                type: "date",
                placeholder: "",
                colSpan: 1,
            },
            {
                title: "Job Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter job description",
                colSpan: 1,
            },
        ],
        buttonText: isLoading ? "Saving..." : "Save Changes",
        layout: {
            type: "flex",
            direction: "column",
            gap: "2",
        },
    };

    // Initial values for the form
    const initialValues = {
        title: item.title,
        startDate: formatDateForInput(item.startDate),
        endDate: formatDateForInput(item.endDate),
        description: item.description,
    };

    return (
        <Modal
            isOpen={isOpen || false}
            onClose={onCancel || (() => {})}
            title="Edit Work Experience"
            isDisplayedReturnLink={false}
            size="medium"
        >

            <div className="space-y-4">
                <HeadlessForm config={formConfig} onSubmit={handleFormSubmit} initialValues={initialValues} />
                <SecondaryButton text="Cancel" onClick={onCancel} style="w-full" />
            </div>
        </Modal>
        
    );
}
