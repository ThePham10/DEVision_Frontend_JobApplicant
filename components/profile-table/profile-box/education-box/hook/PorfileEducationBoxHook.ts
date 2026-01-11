import { getEducation, createEducation, updateEducation, deleteEducation, updateHighestEducation } from "../service/ProfileEducationBoxService";
import { useAuthStore } from "@/store";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EducationCreateData, Education } from "../types";
import { FormConfig, FormValues } from "@/components/headless-form";
import { useUserProfile } from "@/hooks/useUserProfile";

export const useProfileEducationBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState<Education | undefined>(undefined)
    const [deleteConfirm, setDeleteConfirm] = useState<Education | null>(null)
    const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);
    const { user, userProfile } = useAuthStore()
    const queryClient = useQueryClient()
    useUserProfile()

    const openAddModal = () => {
        setIsModalOpen(true);
    }

    const { data: EducationData } = useQuery({
        queryKey: ["education"],
        queryFn: () => getEducation(user?.id ?? ""),
    })

    const education = EducationData ?? [];

    const createMutation = useMutation({
        mutationFn: createEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setIsModalOpen(false);
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: EducationCreateData }) => updateEducation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setIsModalOpen(false);
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setDeleteConfirm(null)
        }
    })

    const updateHighestEducationMutation = useMutation({
        mutationFn: ({eduName, applicantId} : {eduName: string, applicantId: string}) => updateHighestEducation(eduName, applicantId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userProfile"],
            })
        }
    })

    function handleUpdateHighestEducation({eduName, applicantId}: {eduName: string, applicantId: string}) {
        updateHighestEducationMutation.mutate({eduName, applicantId})
    }

    function handleFormSubmit(data: FormValues) {
        const submitData: EducationCreateData = {
            levelStudy: data.levelStudy as string,
            major: data.major as string,
            schoolName: data.schoolName as string,
            startDate: data.startDate as string,
            endDate: isCurrentlyStudying ? null : (data.endDate as string),
            gpa: Number(data.gpa),
        }
        if (editingEducation) {
            updateMutation.mutate({ id: editingEducation.id, data: submitData })
        } else {
            createMutation.mutate(submitData)
        }
    }

    const handleDelete = async () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.id)
        }
    }

    const highestEducationSelection = [
        {id: "HighSchool", name: "HighSchool"},
        {id: "Bachelor", name: "Bachelor"},
        {id: "Master", name: "Master"},
        {id: "PhD", name: "PhD"},
        {id: "NoGiven", name: "NoGiven"},
    ]

    const formConfig: FormConfig = {
        children: [
            {
                title: "School",
                name: "schoolName",
                type: "text",
                placeholder: "e.g., Harvard University, MIT, Stanford",
                colSpan: 1,
                validation: {
                    required: true,
                    requiredMessage: "School name is required",
                },
            },
            {
                title: "Degree",
                name: "levelStudy",
                type: "select",
                placeholder: "e.g., Bachelor, Master, PhD",
                options: [
                    { id: "Bachelor", value: "Bachelor", name: "Bachelor", icon: "university" },
                    { id: "Master", value: "Master", name: "Master", icon: "building" },
                    { id: "PhD", value: "PhD", name: "PhD", icon: "landmark" },
                ],
                colSpan: 1,
                returnType: "label",
                validation: {
                    required: true,
                    requiredMessage: "Degree/Level of study is required",
                },
            },
            {
                title: "Field of Study",
                name: "major",
                type: "text",
                placeholder: "e.g., Computer Science, Business, Engineering",
                colSpan: 1,
                validation: {
                    required: true,
                    requiredMessage: "Field of study is required",
                },
            },
            {
                title: "Start Date",
                name: "startDate",
                type: "date",
                placeholder: "e.g., 2015",
                colSpan: 1,
                validation: {
                    required: true,
                    requiredMessage: "Start date is required",
                },
            },
            // Only include End Date field if not currently studying
            ...(!isCurrentlyStudying ? [{
                title: "End Date",
                name: "endDate",
                type: "date",
                placeholder: "e.g., 2019",
                colSpan: 1,
                validation: {
                    required: true,
                    requiredMessage: "End date is required",
                },
            }] : []),
            {
                title: "GPA",
                name: "gpa",
                type: "number",
                placeholder: "e.g., 3.8",
                colSpan: 1,
                validation: {
                    required: true,
                    requiredMessage: "GPA is required",
                },
            },
        ],
        buttonText: editingEducation ? "Update Education" : "Add New Education",
        layout: {
            type: "flex",
            direction: "column",
            gap: "4",
        },
    };

    // Open edit modal
    const openEditModal = (education: Education) => {
        setEditingEducation(education);
        setIsCurrentlyStudying(!education.endDate || education.endDate === "");
        setIsModalOpen(true);
    };

    return {
        user,
        highestEducationSelection,
        userProfile,
        isModalOpen,
        formConfig,
        setIsModalOpen,
        openAddModal,
        education,
        handleFormSubmit,
        isCurrentlyStudying,
        setIsCurrentlyStudying,
        editingEducation,
        setEditingEducation,
        openEditModal,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        handleUpdateHighestEducation
    }
}