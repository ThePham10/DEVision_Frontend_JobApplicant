"use client";

import SkillCard from "./SkillCard";
import SkillForm from "./SkillForm";
import Modal from "@/components/reusable-component/Modal";
import Button from "@/components/reusable-component/Button";
import { FaSearch, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import useSkillManagement from "../hook/SkillManagementHook";

export default function SkillManagement() {
    const {
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
    } = useSkillManagement();
    
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-[Inter] text-gray-900">
                        Skill Management
                    </h1>
                    <p className="text-gray-500 font-[Inter]">
                        Manage skills that applicants can use on their profiles
                    </p>
                </div>
                <Button 
                    text="Add Skill" 
                    onClick={openAddModal}
                    style="flex items-center gap-2"
                />
            </div>
            
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-lg font-semibold mb-4">Search Skills</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by skill name..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter] bg-white"
                    >
                        <option value="">All Categories</option>
                        {jobCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <Button text="Search" onClick={handleSearch} />
                </div>
                
                {/* Active Filters */}
                {(filters.name || filters.jobCategoryId) && (
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
                        {filters.jobCategoryId && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Category: {getCategoryName(filters.jobCategoryId)}
                                <FaTimes 
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
                    Showing {skills.length} of {total} skills
                </div>
            </div>
            
            {/* Skills List */}
            <div className="flex flex-col gap-3">
                {loading && skills.length === 0 ? (
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
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingSkill(null);
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
