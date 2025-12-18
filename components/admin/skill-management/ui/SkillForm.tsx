"use client";

import { useState } from "react";
import { Skill, JobCategory } from "../types";
import Button from "@/components/reusable-component/Button";
import { motion } from "framer-motion";

interface SkillFormProps {
    skill?: Skill | null;
    jobCategories: JobCategory[];
    onSubmit: (data: { name: string; jobCategoryId: string; description?: string; isActive: boolean }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function SkillForm({ skill, jobCategories, onSubmit, onCancel, isLoading = false }: SkillFormProps) {
    // Initialize state directly from props - parent should use key prop to reset form
    const [name, setName] = useState(skill?.name || "");
    const [jobCategoryId, setJobCategoryId] = useState(skill?.jobCategoryId || "");
    const [description, setDescription] = useState(skill?.description || "");
    const [isActive, setIsActive] = useState(skill?.isActive ?? true);
    const [error, setError] = useState("");
    
    const isEditing = !!skill;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!name.trim()) {
            setError("Skill name is required");
            return;
        }
        
        if (!jobCategoryId) {
            setError("Please select a job category");
            return;
        }
        
        onSubmit({
            name: name.trim(),
            jobCategoryId,
            description: description.trim() || undefined,
            isActive
        });
    };
    
    return (
        <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Skill Name Input */}
            <div>
                <label 
                    htmlFor="skillName" 
                    className="block font-[Inter] text-sm font-medium text-gray-700 mb-2"
                >
                    Skill Name *
                </label>
                <input
                    id="skillName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., React, Python, Docker"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-[Inter]"
                    disabled={isLoading}
                />
            </div>
            
            {/* Job Category Select */}
            <div>
                <label 
                    htmlFor="jobCategory" 
                    className="block font-[Inter] text-sm font-medium text-gray-700 mb-2"
                >
                    Job Category *
                </label>
                <select
                    id="jobCategory"
                    value={jobCategoryId}
                    onChange={(e) => setJobCategoryId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-[Inter] bg-white"
                    disabled={isLoading}
                >
                    <option value="">Select a job category</option>
                    {jobCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            
            {/* Description Input */}
            <div>
                <label 
                    htmlFor="description" 
                    className="block font-[Inter] text-sm font-medium text-gray-700 mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the skill..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-[Inter] resize-none"
                    disabled={isLoading}
                />
            </div>
            
            {/* Active Toggle */}
            <div className="flex items-center gap-3">
                <input
                    id="isActive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <label 
                    htmlFor="isActive" 
                    className="font-[Inter] text-sm font-medium text-gray-700"
                >
                    Active (visible to applicants)
                </label>
            </div>
            
            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-[Inter]"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <Button
                    type="submit"
                    text={isLoading ? "Saving..." : isEditing ? "Update Skill" : "Add Skill"}
                />
            </div>
        </motion.form>
    );
}
