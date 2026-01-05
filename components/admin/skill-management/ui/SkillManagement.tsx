"use client";

import SkillCard from "./SkillCard";
import SkillForm from "./SkillForm";
import Modal from "@/components/reusable-component/Modal";
import Button from "@/components/reusable-component/Button";
import { Search, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import useSkillManagement from "../hook/SkillManagementHook";
import Dropdown from "@/components/headless-dropdown/ui/Dropdown";

export default function SkillManagement() {
    const {
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
        setCategoryFilter,
        filters, setFilters,
        handleSearch,
        clearFilters,
        openAddModal,
        openEditModal,
        handleFormSubmit,
        handleDelete,
        getCategoryName,
    } = useSkillManagement();
    
    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold font-[Inter] text-gray-900">
                        Skill Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 font-[Inter]">
                        Manage skills that applicants can use on their profiles
                    </p>
                </div>
                <Button 
                    text="Add Skill" 
                    onClick={openAddModal}
                    style="flex items-center gap-2 w-full sm:w-auto justify-center"
                />
            </div>
            
            {/* Filters */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-base sm:text-lg font-semibold mb-3 sm:mb-4">Search Skills</h2>
                <div className="flex flex-row gap-3 sm:gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by skill name..."
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>

                    <Dropdown 
                        items={jobCategories}
                        onChange={(value) => {
                            if (value && !Array.isArray(value)) {
                                setCategoryFilter(value.id);
                                setFilters(prev => ({ ...prev, jobCategoryId: value.id }));
                            }
                        }}
                    />
                    <Button text="Search" onClick={handleSearch} style="w-full sm:w-auto" />
                </div>
                
                {/* Active Filters */}
                {(filters.name || filters.jobCategoryId) && (
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
                        {filters.jobCategoryId && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Category: {getCategoryName(filters.jobCategoryId)}
                                <X 
                                    onClick={() => {
                                        setCategoryFilter("");
                                        setFilters(prev => ({ ...prev, jobCategoryId: undefined }));
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
                    Showing {skills.length} of {totalSkills} skills
                </div>
            </div>
            
            {/* Skills List */}
            <div className="flex flex-col gap-3">
                {isLoading && skills.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading skills...
                    </div>
                ) : skills.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No skills found. Click &quot;Add Skill&quot; to create one.
                    </div>
                ) : (
                    <AnimatePresence>
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                jobCategories={jobCategories}
                                onEdit={openEditModal}
                                onDelete={setDeleteConfirm}
                                onChangeStatus={handleDeActivate}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>
            
            {/* Load More */}
            {hasNextPage && (
                <div className="flex justify-center">
                    <Button 
                        text={isLoading ? "Loading..." : "Load More"} 
                        onClick={handleLoadMore}
                    />
                </div>
            )}
            
            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingSkill(null);
                }}
                title={editingSkill ? "Edit Skill" : "Add New Skill"}
                size="medium"
            >
                <SkillForm
                    key={editingSkill?.id ?? "new"}
                    skill={editingSkill}
                    jobCategories={jobCategories}
                    onSubmit={handleFormSubmit}
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
                        Are you sure you want to delete the skill <strong>&quot;{deleteConfirm?.name}&quot;</strong>? 
                        This action cannot be undone.
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
