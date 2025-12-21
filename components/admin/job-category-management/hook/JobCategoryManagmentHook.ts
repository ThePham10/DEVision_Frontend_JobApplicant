import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JobCategory, JobCategoryFilters } from "@/components/admin/job-category-management/types";
import { loadJobCategories, createJobCategory, updateJobCategory, deleteJobCategory, deActiveJobCategory } from "@/components/admin/job-category-management/service/JobCategoryService"

export default function useJobCategoryManagment() {
    const queryClient = useQueryClient();
    
    // Pagination and filter state
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("");
    const [filters, setFilters] = useState<JobCategoryFilters>({});
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<JobCategory | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<JobCategory | null>(null);
    
    // Query for fetching categories - data is cached and automatically managed
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["jobCategories", page, filters],
        queryFn: () => loadJobCategories(page, 10, filters),
    });
    
    const categories = data?.data ?? [];
    const total = data?.total ?? 0;
    const hasMore = page * 10 < total;
    
    // Mutation for creating category
    const createMutation = useMutation({
        mutationFn: createJobCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
            setIsModalOpen(false);
            setEditingCategory(null);
        },
    });
    
    // Mutation for updating category
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<JobCategory> }) => 
            updateJobCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
            setIsModalOpen(false);
            setEditingCategory(null);
        },
    });
    
    // Mutation for deleting category
    const deleteMutation = useMutation({
        mutationFn: deleteJobCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
            setDeleteConfirm(null);
        },
    });
    
    // Mutation for deactivating category
    const deactivateMutation = useMutation({
        mutationFn: deActiveJobCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
        },
    });
    
    // Handle search
    const handleSearch = () => {
        setPage(1); // Reset to first page when searching
        setFilters({
            name: searchTerm || undefined,
            isActive: activeFilter === "" ? undefined : activeFilter === "active",
        });
    };
    
    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setActiveFilter("");
        setFilters({});
        setPage(1);
    };
    
    // Open modals
    const openAddModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };
    
    const openEditModal = (category: JobCategory) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };
    
    // Handle form submit
    const handleFormSubmit = (data: { name: string; description?: string }) => {
        if (editingCategory) {
            updateMutation.mutate({ id: editingCategory.id, data });
        } else {
            createMutation.mutate(data);
        }
    };
    
    // Handle delete
    const handleDelete = () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.id);
        }
    };
    
    // Handle status change
    const handleDeActiveJobCategory = (category: JobCategory) => {
        deactivateMutation.mutate(category.id);
    };
    
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const loading = isLoading || isFetching;

    return {
        searchTerm, setSearchTerm,
        activeFilter, setActiveFilter,
        filters, setFilters,
        setPage,
        isFetching,
        isLoading,
        editingCategory, setEditingCategory,
        isModalOpen, setIsModalOpen,
        categories,
        total,
        hasMore,
        isSubmitting,
        loading,
        deleteConfirm, setDeleteConfirm,
        deleteMutation,
        handleSearch,
        clearFilters,
        openAddModal,
        openEditModal,
        handleFormSubmit,
        handleDelete,
        handleDeActiveJobCategory,
    }
}