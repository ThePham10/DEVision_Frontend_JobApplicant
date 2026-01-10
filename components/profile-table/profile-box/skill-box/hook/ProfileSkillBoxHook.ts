import { FormConfig, FormValues } from "@/components/headless-form";
import { useDataStore } from "@/store/dataStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";
import { useAuthStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewSkill, deleteSkill } from "../service/ProfileSkillService";

export const useProfileSkillBox = () => {
    const { skills } = useDataStore()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, userProfile } = useAuthStore()
    const queryClient = useQueryClient();
    useUserProfile();

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

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const updateMutation = useMutation({
        mutationFn: ({ data }: { data: FormValues }) =>
            addNewSkill(user?.id || "", userProfile?.skillCategories || [], (data.skills as string[]) || []),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            setIsModalOpen(false);
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ data }: { data: string }) =>
            deleteSkill(user?.id || "", userProfile?.skillCategories || [], data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        }
    })

    const handleAdd = (data: FormValues) => {
        updateMutation.mutate({ data });
    }

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