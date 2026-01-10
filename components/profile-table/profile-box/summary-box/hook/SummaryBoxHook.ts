import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSummaryObjective } from "../service/SummaryBoxService";
import { useAuthStore } from "@/store";
import { FormConfig } from "@/components/headless-form";

export const useSummaryBox = () => {
    const formConfig: FormConfig = {
        children: [
            { name: "objectiveSummary", title: "Summary", type: "text", placeholder: "Write a brief summary about your career objectives...", colSpan: 1 },
        ],
        buttonText: "Save",
        layout: {
            type: "grid",
            columns: 4,
            gap: "6",
        },
    };  

    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (summary: string) => updateSummaryObjective(user?.id || "", summary),
        onSuccess: () => {
            // Invalidate the user profile query to refetch updated data
            queryClient.invalidateQueries({ queryKey: ["userProfile", user?.id] });
        },
    });

    const handleSubmit = async (summary?: string) => {
        if (!summary) return;
        updateMutation.mutate(summary);
    }

    return {
        formConfig,
        handleSubmit,
    }
}