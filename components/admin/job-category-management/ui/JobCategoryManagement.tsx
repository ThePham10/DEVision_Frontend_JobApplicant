"use client";

import { useState, useCallback, useEffect } from "react";
import { JobCategory, JobCategoryFilters, PaginatedResponse } from "../types";
import { loadJobCategories, createJobCategory, updateJobCategory, deleteJobCategory } from "../service/JobCategoryService";
import JobCategoryCard from "./JobCategoryCard";
import JobCategoryForm from "./JobCategoryForm";
import Modal from "@/components/reusable-component/Modal";
import Button from "@/components/reusable-component/Button";
import { FaSearch, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";

export default function JobCategoryManagement() {
    // State
    const [categories, setCategories] = useState<JobCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [total, setTotal] = useState(0);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<JobCategory | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Delete confirmation
    const [deleteConfirm, setDeleteConfirm] = useState<JobCategory | null>(null);
    
    // Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("");
    const [filters, setFilters] = useState<JobCategoryFilters>({});
    
    // Load categories
    const fetchCategories = useCallback(async (pageNum: number, currentFilters: JobCategoryFilters, append = false) => {
        setLoading(true);
        try {
            const response: PaginatedResponse<JobCategory> = await loadJobCategories(pageNum, 10, currentFilters);
            setCategories(prev => append ? [...prev, ...response.data] : response.data);
            setHasMore(response.hasMore);
            setTotal(response.total);
            setPage(pageNum);
        } catch (error) {
            console.error("Failed to load categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Initial load and when filters change
    useEffect(() => {
        fetchCategories(1, filters);
    }, [filters, fetchCategories]);
    
    // Handle search
    const handleSearch = () => {
        const newFilters: JobCategoryFilters = {
            name: searchTerm || undefined,
            isActive: activeFilter === "" ? undefined : activeFilter === "active",
        };
        setFilters(newFilters);
    };
    
    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setActiveFilter("");
        setFilters({});
    };
    
    // Load more
    const handleLoadMore = () => {
        fetchCategories(page + 1, filters, true);
    };
    
    // Open add modal
    const openAddModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };
    
    // Open edit modal
    const openEditModal = (category: JobCategory) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };
    
    // Handle form submit
    const handleFormSubmit = async (data: { name: string; description?: string; isActive: boolean }) => {
        setIsSubmitting(true);
        try {
            if (editingCategory) {
                await updateJobCategory(editingCategory.id, data);
            } else {
                await createJobCategory(data);
            }
            setIsModalOpen(false);
            setEditingCategory(null);
            fetchCategories(1, filters);
        } catch (error) {
            console.error("Failed to save category:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Handle delete
    const handleDelete = async () => {
        if (!deleteConfirm) return;
        
        try {
            await deleteJobCategory(deleteConfirm.id);
            setDeleteConfirm(null);
            fetchCategories(1, filters);
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };
    
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
                </div>
            </div>
            
            {/* Categories List */}
            <div className="flex flex-col gap-3">
                {loading && categories.length === 0 ? (
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
                        onClick={handleLoadMore}
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
                isDisplayedReturnLink = {false}
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
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter]"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
