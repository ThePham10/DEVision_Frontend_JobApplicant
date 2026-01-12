import { FormConfig, FormValues } from "@/components/headless-form";
import { useDataStore } from "@/store/dataStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";
import { useAuthStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewSkill, deleteSkill } from "../service/ProfileSkillService";

export const useProfileSkillBox = () => {
    // Get skills from store 
    const { skills } = useDataStore()

    // State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get user profile from store
    const { user, userProfile } = useAuthStore()

    // Get query client
    const queryClient = useQueryClient();

    // Use user profile hook
    useUserProfile();

    // Form configuration
    const formConfig: FormConfig = {
        children: [
            {
                title: "Name",
                name: "skills",
                type: "select",
                options: skills,
                multiple: true,
                placeholder: "e.g., JavaScript, Python, React, Node.js",
                colSpan: 1,
            },

        ],
        buttonText: "Add New Skill",
        layout: {
            type: "flex",
            direction: "column",
        },
    };

    // handle open add skill modal
    const openAddModal = () => {
        setIsModalOpen(true);
    };

    // handle update mutation
    const updateMutation = useMutation({
        mutationFn: ({ data }: { data: FormValues }) =>
            addNewSkill(user?.id || "", userProfile?.skillCategories || [], (data.skills as string[]) || []),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            setIsModalOpen(false);
        }
    })

    // handle delete mutation
    const deleteMutation = useMutation({
        mutationFn: ({ data }: { data: string }) =>
            deleteSkill(user?.id || "", userProfile?.skillCategories || [], data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        }
    })

    // handle add new skill
    const handleAdd = (data: FormValues) => {
        updateMutation.mutate({ data });
    }

    // handle delete skill
    const handleDelete = (data: string) => {
        deleteMutation.mutate({ data });
    }

    return {
        userProfile,
        formConfig,
        openAddModal,
        isModalOpen,
        setIsModalOpen,
        handleDelete,
        handleAdd
    }
}