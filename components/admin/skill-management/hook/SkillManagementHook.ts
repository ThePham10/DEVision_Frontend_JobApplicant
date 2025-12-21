import { useState, useCallback, useEffect } from "react";
import { Skill, SkillFilters, PaginatedResponse, JobCategory } from "../types";
import { loadSkills, createSkill, updateSkill, deleteSkill, loadJobCategories } from "../service/SkillService";

export default function useSkillManagement() {
        // State
    const [skills, setSkills] = useState<Skill[]>([]);
    const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [total, setTotal] = useState(0);
    
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
    
    // Load job categories on mount
    useEffect(() => {
        loadJobCategories().then(setJobCategories);
    }, []);
    
    // Load skills
    const fetchSkills = useCallback(async (pageNum: number, currentFilters: SkillFilters, append = false) => {
        setLoading(true);
        try {
            const response: PaginatedResponse<Skill> = await loadSkills(pageNum, 10, currentFilters);
            setSkills(prev => append ? [...prev, ...response.data] : response.data);
            setHasMore(response.hasMore);
            setTotal(response.total);
            setPage(pageNum);
        } catch (error) {
            console.error("Failed to load skills:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Initial load and when filters change
    useEffect(() => {
        fetchSkills(1, filters);
    }, [filters, fetchSkills]);
    
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
    
    // Load more
    const handleLoadMore = () => {
        fetchSkills(page + 1, filters, true);
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
    const handleFormSubmit = async (data: { name: string; jobCategoryId: string; description?: string; isActive: boolean }) => {
        setIsSubmitting(true);
        try {
            if (editingSkill) {
                await updateSkill(editingSkill.id, data);
            } else {
                await createSkill(data);
            }
            setIsModalOpen(false);
            setEditingSkill(null);
            fetchSkills(1, filters); // Refresh list
        } catch (error) {
            console.error("Failed to save skill:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Handle delete
    const handleDelete = async () => {
        if (!deleteConfirm) return;
        
        try {
            await deleteSkill(deleteConfirm.id);
            setDeleteConfirm(null);
            fetchSkills(1, filters); // Refresh list
        } catch (error) {
            console.error("Failed to delete skill:", error);
        }
    };
    
    // Get category name for display
    const getCategoryName = (categoryId: string) => {
        return jobCategories.find(cat => cat.id === categoryId)?.name || "Unknown";
    };

    return {
        skills,
        jobCategories,
        loading,
        hasMore,
        total,
        isModalOpen, setIsModalOpen,
        editingSkill, setEditingSkill,
        isSubmitting,
        deleteConfirm, setDeleteConfirm,
        searchTerm, setSearchTerm,
        categoryFilter, setCategoryFilter,
        filters, setFilters,
        fetchSkills,
        handleSearch,
        clearFilters,
        handleLoadMore,
        openAddModal,
        openEditModal,
        handleFormSubmit,
        handleDelete,
        getCategoryName,
    }
}