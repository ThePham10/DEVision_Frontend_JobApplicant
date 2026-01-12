import { getEducation, createEducation, updateEducation, deleteEducation, updateHighestEducation } from "../service/ProfileEducationBoxService";
import { useAuthStore } from "@/store";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EducationCreateData, Education } from "../types";
import { FormConfig, FormValues } from "@/components/headless-form";
import { useUserProfile } from "@/hooks/useUserProfile";

/**
 * Profile education box hook
 */
export const useProfileEducationBox = () => {
    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState<Education | undefined>(undefined)
    const [deleteConfirm, setDeleteConfirm] = useState<Education | null>(null)
    const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

    // Auth store
    const { user, userProfile } = useAuthStore()
    
    // Query client
    const queryClient = useQueryClient()
    
    // User profile
    useUserProfile()

    // Modal handlers
    const openAddModal = () => {
        setIsModalOpen(true);
    }

    // Query for fetching education data 
    const { data: EducationData } = useQuery({
        queryKey: ["education"],
        queryFn: () => getEducation(user?.id ?? ""),
    })

    // Education data
    const education = EducationData ?? [];

    // Mutation for creating education
    const createMutation = useMutation({
        mutationFn: createEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setIsModalOpen(false);
        }
    })

    // Mutation for updating education
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: EducationCreateData }) => updateEducation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setIsModalOpen(false);
        }
    })

    // Mutation for deleting education
    const deleteMutation = useMutation({
        mutationFn: deleteEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["education"],
            })
            setDeleteConfirm(null)
        }
    })

    // Mutation for updating highest education
    const updateHighestEducationMutation = useMutation({
        mutationFn: ({eduName, applicantId} : {eduName: string, applicantId: string}) => updateHighestEducation(eduName, applicantId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userProfile"],
            })
        }
    })

    // Function for updating highest education
    function handleUpdateHighestEducation({eduName, applicantId}: {eduName: string, applicantId: string}) {
        updateHighestEducationMutation.mutate({eduName, applicantId})
    }

    // Function for handling form submit
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

    // Function for handling delete
    const handleDelete = async () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.id)
        }
    }

    // Highest education selection
    const highestEducationSelection = [
        {id: "HighSchool", name: "HighSchool"},
        {id: "Bachelor", name: "Bachelor"},
        {id: "Master", name: "Master"},
        {id: "PhD", name: "PhD"},
        {id: "NoGiven", name: "NoGiven"},
    ]

    // Form config
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