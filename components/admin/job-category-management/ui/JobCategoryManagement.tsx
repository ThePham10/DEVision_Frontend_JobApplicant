"use client";

import JobCategoryCard from "./JobCategoryCard";
import JobCategoryForm from "./JobCategoryForm";
import { Modal, Button} from "@/components/reusable-component";
import { Search, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import useJobCategoryManagment from "../hook/JobCategoryManagmentHook";
import Dropdown from "@/components/headless-dropdown/ui/Dropdown";

export function JobCategoryManagement() {
    const {
        searchTerm, setSearchTerm,
        setActiveFilter,
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
        handleActivateJobCategory,
    } = useJobCategoryManagment();
    
    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold font-[Inter] text-gray-900">
                        Job Category Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 font-[Inter]">
                        Manage job categories for organizing skills
                    </p>
                </div>
                <Button 
                    text="Add Category" 
                    onClick={openAddModal}
                    style="flex items-center gap-2 w-full sm:w-auto justify-center"
                />
            </div>
            
            {/* Filters */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-base sm:text-lg font-semibold mb-3 sm:mb-4">Search Categories</h2>
                <div className="flex flex-row gap-3 sm:gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name or description..."
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Dropdown 
                            items={[
                                {id: "1", value: "", name: "All Status", icon: "globe" },
                                {id: "2", value: "active", name: "Active Only", icon: "eye" },
                                {id: "3", value: "inactive", name: "Inactive Only", icon: "eye-closed" },
                            ]}
                            placeholder="Select Status"
                            onChange={(e) => {
                                if (e && !Array.isArray(e)) {
                                    setActiveFilter(e.value);
                                }
                            }}
                            showSearch={false}
                        />
                        <Button text="Search" onClick={handleSearch} style="w-full sm:w-auto" />
                    </div>
                </div>
                
                {/* Active Filters */}
                {(filters.name || filters.isActive !== undefined) && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        {filters.name && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Name: {filters.name}
                                <X 
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
                                <X 
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
                                onDeactivate={handleDeActiveJobCategory}
                                onActivate={handleActivateJobCategory}
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
