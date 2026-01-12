import { useState } from "react";
import { Skill, SkillFilters } from "../types";
import { loadSkills, createSkill, updateSkill, deleteSkill, deActiveSkill } from "../service/SkillService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDataStore } from "@/store";
import toast from "react-hot-toast";

const PAGE_SIZE = 10; // Number of items to show per "page"

/**
 * Skill management hook
 */
export default function useSkillManagement() {
    //Query client
    const queryClient = useQueryClient();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Delete confirmation
    const [deleteConfirm, setDeleteConfirm] = useState<Skill | null>(null);

    // Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [filters, setFilters] = useState<SkillFilters>({});

    // Client-side pagination state
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // Job category list
    const { jobCategories } = useDataStore();

    // Convert filters to api filters
    const buildApiFilters = () => {
        const apiFilters: { id: string; value: string; operator: string }[] = [];

        if (searchTerm) {
            apiFilters.push({
                id: 'name',
                value: searchTerm,
                operator: 'contains'
            });
        }

        if (categoryFilter) {
            apiFilters.push({
                id: 'jobCategoryId',
                value: categoryFilter,
                operator: 'equals'
            });
        }

        return apiFilters;
    };

    // Load ALL skills
    const {
        data: skillData,
        isLoading,
    } = useQuery({
        queryKey: ["skillsAdmin", filters], 
        queryFn: () => loadSkills(buildApiFilters()),
    });

    // Get all skills from server (already filtered by API)
    const allSkills = skillData?.data ?? [];
    const totalSkills = skillData?.total ?? 0;

    // Lazy loading
    const skills = allSkills.slice(0, visibleCount);
    const hasNextPage = visibleCount < allSkills.length;

    // Create mutation
    const createMutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skillsAdmin"] });
            setIsModalOpen(false);
            setEditingSkill(null);
            toast.success("Skill created successfully")
        },
        onError: () => {
            toast.error("Skill creation failed")
        }
    })

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Omit<Skill, "id" | "createdAt">> }) =>
            updateSkill(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skillsAdmin"] });
            setIsModalOpen(false);
            setEditingSkill(null);
            toast.success("Skill updated successfully")
        },
        onError: () => {
            toast.error("Skill update failed")
        }
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skillsAdmin"] });
            setIsModalOpen(false);
            setDeleteConfirm(null);
            toast.success("Skill deleted successfully")
        },
        onError: () => {
            toast.error("Skill deletion failed")
        }
    })

    // Deactivate mutation
    const deActiveMutation = useMutation({
        mutationFn: deActiveSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skillsAdmin"] });
            setIsModalOpen(false);
            setDeleteConfirm(null);
            toast.success("Skill deactivated successfully")
        },
        onError: () => {
            toast.error("Skill deactivation failed")
        }
    })

    // Handle load more
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    }

    // Handle search
    const handleSearch = () => {
        const newFilters: SkillFilters = {
            name: searchTerm || undefined,
            jobCategoryId: categoryFilter || undefined,
        };
        setFilters(newFilters);
        setVisibleCount(PAGE_SIZE); // Reset pagination when searching
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("");
        setFilters({});
        setVisibleCount(PAGE_SIZE); // Reset pagination when clearing filters
    };

    // Open add modal
    const openAddModal = () => {
        setEditingSkill(null);
        setIsModalOpen(true);
    };

    // Open edit modal
    const openEditModal = (skill: Skill) => {
        setEditingSkill(skill);
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleFormSubmit = async (data: { name: string; jobCategoryId?: string; description?: string; icon?: string }) => {
        setIsSubmitting(true);
        if (editingSkill) {
            updateMutation.mutate({ id: editingSkill.id, data });
        } else {
            if (!data.jobCategoryId) {
                throw new Error("Job category is required when creating a skill");
            }
            createMutation.mutate({
                name: data.name,
                jobCategoryId: data.jobCategoryId,
                description: data.description,
                icon: data.icon,
            });
        }
        setIsSubmitting(false);
    };

    //Handle deactivate skill
    const handleDeActivate = async (skill: Skill) => {
        deActiveMutation.mutate(skill.id);
    }

    // Handle delete
    const handleDelete = async () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.id);
        }
    };

    // Get category name for display
    const getCategoryName = (categoryId: string) => {
        return jobCategories.find(cat => cat.id === categoryId)?.name || "Unknown";
    };

    return {
        skills,
        jobCategories,
        isLoading,
        handleLoadMore,
        handleDeActivate,
        hasNextPage,
        totalSkills,
        isModalOpen, setIsModalOpen,
        editingSkill, setEditingSkill,
        isSubmitting,
        deleteConfirm, setDeleteConfirm,
        searchTerm, setSearchTerm,
        categoryFilter, setCategoryFilter,
        filters, setFilters,
        handleSearch,
        clearFilters,
        openAddModal,
        openEditModal,
        handleFormSubmit,
        handleDelete,
        getCategoryName,
    }
}