"use client"

import { Button, Modal } from "@/components/reusable-component";
import ProfileEducationCard from "../ui/ProfileEducationCard";
import { HeadlessForm } from "@/components/headless-form";
import { SecondaryButton } from "@/components/reusable-component";
import { useProfileEducationBox } from "../hook/PorfileEducationBoxHook";
import Dropdown from "@/components/headless-dropdown";

export const ProfileEducationBox = () => {
    const {
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
    } = useProfileEducationBox()
    
    return (
        <div className="group relative z-10 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-visible">
            <div>
                {/* Header Row: Title + Add Button */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Education
                    </h2>

                    <Button 
                        text="Add Education" 
                        onClick={openAddModal}
                        style="flex items-center gap-2"
                    />
                </div>
                
                {/* Highest Education Selection Row */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Highest Education Level:</span>
                    </div>
                    <Dropdown 
                        items={highestEducationSelection} 
                        onChange={(value) => value && !Array.isArray(value) && handleUpdateHighestEducation({eduName: value.name, applicantId: user?.id || ""})}
                        placeholder="Select your highest education"
                        defaultValue={userProfile?.highestEducation}
                        showSearch={false}
                        showCount={false}
                        showIcons={false}
                        width="w-full sm:w-[200px]"
                    />
                </div>
                
                {/* Education List */}
                <ProfileEducationCard 
                    educationList={education}
                    openEditModal={openEditModal}
                    onDelete={setDeleteConfirm}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                isDisplayedReturnLink={false}
                size="medium"
            >
                <h2 className="font-[Inter] text-2xl font-bold mb-6">New Education Form</h2>
                <div className="space-y-4">
                    {/* Currently Studying Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={isCurrentlyStudying}
                            onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                            I am currently studying here
                        </span>
                    </label>
                    
                    <HeadlessForm config={formConfig} onSubmit={handleFormSubmit} />
                    <SecondaryButton text="Cancel" onClick={() => { setIsModalOpen(false) }} style="w-full" />
                </div>
            </Modal>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEducation(undefined);
                }}
                size="medium"
            >
                <h2 className="font-[Inter] text-2xl font-bold mb-6">{editingEducation ? "Edit Education" : "Add New Education"}</h2>
                <div className="space-y-4">
                    {/* Currently Studying Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={isCurrentlyStudying}
                            onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                            I am currently studying here
                        </span>
                    </label>
                    
                    <HeadlessForm 
                        config={formConfig} 
                        initialValues={editingEducation ? {
                            ...editingEducation,
                            gpa: String(editingEducation.gpa),
                            startDate: editingEducation.startDate ? editingEducation.startDate.substring(0, 10) : "",
                            endDate: editingEducation.endDate ? editingEducation.endDate.substring(0, 10) : ""
                        } : undefined} 
                        onSubmit={handleFormSubmit} 
                    />
                    <SecondaryButton text="Cancel" onClick={() => { setIsModalOpen(false) }} style="w-full" />
                </div>
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
                        Are you sure you want to delete the education <strong>&quot;{deleteConfirm?.major}&quot;</strong>? 
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
    )
}