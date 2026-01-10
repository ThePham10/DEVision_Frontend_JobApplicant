import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useDataStore } from "@/store";
import { updateWorkExperience } from "../api/WorkExpService";
import { WorkExpData } from "../types";

export default function useWorkExpCard(item: WorkExpData) {
    const [open, setOpen] = useState(false);
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const { skills } = useDataStore();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">> }) => 
            updateWorkExperience(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setOpen(false);
        }
    });

    const handleUpdate = (data: Partial<Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">>) => {
        updateMutation.mutate({ id: item.id, data });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const userWorkExpSkills = skills.filter(skill => item.skillCategories.includes(skill.id));
    const userWorkExpSkills = (skills ?? []).filter(skill =>(item.skillCategories ?? []).includes(skill.id));


    return {
        open,
        formatDate,
        handleUpdate,
        handleClickOpen,
        handleClose,
        userWorkExpSkills,
    };
}
