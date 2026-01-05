"use client";

import { Skill, JobCategory } from "../types";
import { Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { icons } from "@/components/reusable-component";

interface SkillCardProps {
    skill: Skill;
    jobCategories: JobCategory[];
    onEdit: (skill: Skill) => void;
    onDelete: (skill: Skill) => void;
    onChangeStatus: (skill: Skill) => void;
}

export default function SkillCard({ skill, jobCategories, onEdit, onDelete, onChangeStatus }: SkillCardProps) {
    // Look up category name from ID
    const category = jobCategories.find(cat => cat.id === skill.jobCategoryId);
    const categoryName = category?.name || "Unknown";
    
    return (
        <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            {/* Left section: Skill info and badges */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div>
                    {(() => {
                        const Icon = icons[skill.icon || "Other"];
                        return <Icon className="w-6 h-6 text-black font-bold" />;
                    })()}
                </div>

                {/* Skill Name */}
                <div className="font-[Inter] font-semibold text-sm sm:text-base text-gray-900">
                    {skill.name}
                </div>
                
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Badge */}
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}>
                        {categoryName}
                    </span>
                    
                    {/* Active/Inactive Badge */}
                    <button 
                        onClick={() => onChangeStatus(skill)} 
                        className={`px-2 py-0.5 sm:py-1 rounded text-xs font-medium ${
                            skill.isActive 
                                ? "bg-green-100 text-green-700" 
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {skill.isActive ? "Active" : "Inactive"}
                    </button>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center">
                <motion.button
                    onClick={() => onEdit(skill)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Edit skill"
                >
                    <Edit size={16} />
                </motion.button>
                
                <motion.button
                    onClick={() => onDelete(skill)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete skill"
                >
                    <Trash size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}

