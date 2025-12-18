"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JobCategory, JobCategoryFilters } from "../types";
import { loadJobCategories, createJobCategory, updateJobCategory, deleteJobCategory, deActiveJobCategory } from "../service/JobCategoryService";
import JobCategoryCard from "./JobCategoryCard";
import JobCategoryForm from "./JobCategoryForm";
import Modal from "@/components/reusable-component/Modal";
import Button from "@/components/reusable-component/Button";
import { FaSearch, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";

export default function JobCategoryManagement() {
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
    const hasMore = data?.hasMore ?? false;
    
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
    
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-[Inter] text-gray-900">
                        Job Category Management
                    </h1>
                    <p className="text-gray-500 font-[Inter]">
                        Manage job categories for organizing skills
                    </p>
                </div>
                <Button 
                    text="Add Category" 
                    onClick={openAddModal}
                    style="flex items-center gap-2"
                />
            </div>
            
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-lg font-semibold mb-4">Search Categories</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name or description..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter] bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                    <Button text="Search" onClick={handleSearch} />
                </div>
                
                {/* Active Filters */}
                {(filters.name || filters.isActive !== undefined) && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        {filters.name && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Name: {filters.name}
                                <FaTimes 
                                    onClick={() => {
                                        setSearchTerm("");
                                        setFilters(prev => ({ ...prev, name: undefined }));
                                    }}
                                    className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                />
                            </span>
                        )}
                        {filters.isActive !== undefined && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Status: {filters.isActive ? "Active" : "Inactive"}
                                <FaTimes 
                                    onClick={() => {
                                        setActiveFilter("");
                                        setFilters(prev => ({ ...prev, isActive: undefined }));
                                    }}
                                    className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                />
                            </span>
                        )}
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>
            
            {/* Results count */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 font-[Inter]">
                    Showing {categories.length} of {total} categories
                    {isFetching && !isLoading && <span className="ml-2 text-blue-500">(Updating...)</span>}
                </div>
            </div>
            
            {/* Categories List */}
            <div className="flex flex-col gap-3">
                {isLoading && categories.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading categories...
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No categories found. Click &quot;Add Category&quot; to create one.
                    </div>
                ) : (
                    <AnimatePresence>
                        {categories.map((category) => (
                            <JobCategoryCard
                                key={category.id}
                                category={category}
                                onChangeStatus={handleDeActiveJobCategory}
                                onEdit={openEditModal}
                                onDelete={setDeleteConfirm}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>
            
            {/* Load More */}
            {hasMore && (
                <div className="flex justify-center">
                    <Button 
                        text={loading ? "Loading..." : "Load More"} 
                        onClick={() => setPage(prev => prev + 1)}
                    />
                </div>
            )}
            
            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                }}
                title={editingCategory ? "Edit Category" : "Add New Category"}
                isDisplayedReturnLink={false}
                size="medium"
            >
                <JobCategoryForm
                    key={editingCategory?.id ?? "new"}
                    category={editingCategory}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingCategory(null);
                    }}
                    isLoading={isSubmitting}
                />
            </Modal>
            
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to delete the category <strong>&quot;{deleteConfirm?.name}&quot;</strong>? 
                        This may affect skills that use this category.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-[Inter]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter] disabled:opacity-50"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
