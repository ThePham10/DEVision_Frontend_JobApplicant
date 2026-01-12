import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getWorkExperiences, deleteWorkExperience, createWorkExperience } from "../api/WorkExpService";
import { WorkExpData } from "../types";
import toast from "react-hot-toast";

export default function useWorkExpBox() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<WorkExpData | null>(null);
    const { isAuthenticated, user } = useAuthStore();
    const queryClient = useQueryClient();

    const { data: fetchedData } = useQuery({
        queryKey: ['userWorkExp', user?.id],
        queryFn: () => {
            if (!user) throw new Error("User not found");
            return getWorkExperiences(user.id);
        },
        enabled: isAuthenticated && !!user,
    });

    const userWorkExp = fetchedData?.data;

    const createMutation = useMutation({
        mutationFn: createWorkExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setIsModalOpen(false);
            toast.success("Work experience added successfully");
        },
        onError: () => {
            toast.error("Work experience adding failed");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWorkExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userWorkExp", user?.id] });
            setDeleteConfirm(null);
            toast.success("Work experience deleted successfully");
        },
        onError: () => {
            toast.error("Work experience deleting failed");
        }
    });

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
    };

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
