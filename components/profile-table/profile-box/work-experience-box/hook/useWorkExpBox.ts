import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getWorkExperiences, deleteWorkExperience, createWorkExperience } from "../api/WorkExpService";
import { WorkExpData } from "../types";

export default function useWorkExpBox() {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<WorkExpData | null>(null);
    const { isAuthenticated, user } = useAuthStore();
    const queryClient = useQueryClient();

    // Fetch user work experiences
    const { data: fetchedData } = useQuery({
        queryKey: ['userWorkExp', user?.id],
        queryFn: () => {
            if (!user) throw new Error("User not found");
            return getWorkExperiences(user.id);
        },
        // Only fetch when user is authenticated and user exists
        enabled: isAuthenticated && !!user,
    });

    const userWorkExp = fetchedData?.data;

    // Create and delete mutations for work experiences
    // On success, invalidate the user work experience query to refetch updated data
    const createMutation = useMutation({
        mutationFn: createWorkExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setIsModalOpen(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWorkExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setDeleteConfirm(null);
        }
    });

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
    };

    // Handle creation of a new work experience
    // Filters out id, applicantId, createdAt, updatedAt from the data
    const handleCreateSubmit = (data: Omit<WorkExpData, "id" | "applicantId" | "createdAt" | "updatedAt">) => {
        if (!user) return;
        createMutation.mutate(data);
    };

    const handleDelete = () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.id);
        }
    };

    return {
        isAuthenticated,
        user,
        userWorkExp,
        isModalOpen,
        deleteConfirm,
        setDeleteConfirm,
        openAddModal,
        closeAddModal,
        handleCreateSubmit,
        handleDelete,
    };
}
