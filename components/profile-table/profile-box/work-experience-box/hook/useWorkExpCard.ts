import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { updateWorkExperience } from "../api/WorkExpService";
import { WorkExpData } from "../types";

export default function useWorkExpCard(item: WorkExpData) {
    // States
    const [open, setOpen] = useState(false);
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    // Format date to readable string
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Update mutation for work experience
    // On success, invalidate the user work experience query to refetch updated data
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">> }) => 
            updateWorkExperience(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setOpen(false);
        }
    });

    // Fileter out id, applicantId, createdAt, updatedAt from updating
    const handleUpdate = (data: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">>) => {
        updateMutation.mutate({ id: item.id, data });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        formatDate,
        handleUpdate,
        handleClickOpen,
        handleClose,
    };
}
