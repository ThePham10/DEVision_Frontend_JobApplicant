import { useState } from "react";
import { Skill, SkillFilters} from "../types";
import { loadSkills, loadSkillsByCategory, createSkill, updateSkill, deleteSkill, loadJobCategories, deActiveSkill } from "../service/SkillService";
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export default function useSkillManagement() {
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

    const { data: categoriesData} = useQuery ({
        queryKey: ["jobCategories"],
        queryFn: () => loadJobCategories(1000),
    })

    const jobCategories = categoriesData ?? [];

    const {
        data: skillData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["skills", filters],
        queryFn: ({pageParam}) => {
            // Use different API based on whether category filter is active
            if (filters.jobCategoryId) {
                return loadSkillsByCategory(filters.jobCategoryId);
            }
            return loadSkills(pageParam, 10);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    })
    
    // Derived state - React 19 Compiler handles memoization automatically
    const allSkills = skillData?.pages.flatMap(page => page.data) ?? [];
    const totalSkills = skillData?.pages[0]?.total ?? 0;

    // Filter skills by name if filter is active
    const skills = filters.name
        ? allSkills.filter(s => s.name.toLowerCase().includes(filters.name!.toLowerCase()))
        : allSkills;

    const createMutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            setIsModalOpen(false);
            setEditingSkill(null);
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id: string, data: Partial<Omit<Skill, "id" | "createdAt">>}) => 
            updateSkill(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            setIsModalOpen(false);
            setEditingSkill(null);
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            setIsModalOpen(false);
            setDeleteConfirm(null);
        }
    })

    const deActiveMutation = useMutation({
        mutationFn: deActiveSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            setIsModalOpen(false);
            setDeleteConfirm(null);
        }
    })

    const handleLoadMore = () => {
        fetchNextPage();
    }
    
    // Handle search
    const handleSearch = () => {
        const newFilters: SkillFilters = {
            name: searchTerm || undefined,
            jobCategoryId: categoryFilter || undefined,
        };
        setFilters(newFilters);
    };
    
    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("");
        setFilters({});
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
        isFetchingNextPage,
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