"use client";

import { Skill, JobCategory } from "../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

interface SkillCardProps {
    skill: Skill;
    jobCategories: JobCategory[];
    onEdit: (skill: Skill) => void;
    onDelete: (skill: Skill) => void;
}

// Category color mapping by category name
const categoryColors: Record<string, string> = {
    "Frontend": "bg-blue-100 text-blue-700",
    "Backend": "bg-green-100 text-green-700",
    "Mobile": "bg-purple-100 text-purple-700",
    "DevOps": "bg-orange-100 text-orange-700",
    "Database": "bg-yellow-100 text-yellow-700",
    "Cloud": "bg-cyan-100 text-cyan-700",
    "AI/ML": "bg-pink-100 text-pink-700",
    "Testing": "bg-indigo-100 text-indigo-700",
    "Security": "bg-red-100 text-red-700",
    "Other": "bg-gray-100 text-gray-700",
};

export default function SkillCard({ skill, jobCategories, onEdit, onDelete }: SkillCardProps) {
    // Look up category name from ID
    const category = jobCategories.find(cat => cat.id === skill.jobCategoryId);
    const categoryName = category?.name || "Unknown";
    const categoryColor = categoryColors[categoryName] || categoryColors["Other"];
    
    return (
        <motion.div
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            <div className="flex items-center gap-4">
                {/* Skill Name */}
                <div className="font-[Inter] font-semibold text-gray-900">
                    {skill.name}
                </div>
                
                {/* Category Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                    {categoryName}
                </span>
                
                {/* Active/Inactive Badge */}
                {!skill.isActive && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-600">
                        Inactive
                    </span>
                )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <motion.button
                    onClick={() => onEdit(skill)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Edit skill"
                >
                    <FaEdit size={16} />
                </motion.button>
                
                <motion.button
                    onClick={() => onDelete(skill)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete skill"
                >
                    <FaTrash size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}
