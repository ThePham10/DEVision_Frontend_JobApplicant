"use client";

import { JobCategory } from "../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

interface JobCategoryCardProps {
    category: JobCategory;
    onDeactivate: (category: JobCategory) => void;
    onActivate: (category: JobCategory) => void;
    onEdit: (category: JobCategory) => void;
    onDelete: (category: JobCategory) => void;
}

export default function JobCategoryCard({ category, onDeactivate, onActivate, onEdit, onDelete }: JobCategoryCardProps) {
    return (
        <motion.div
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            <div className="flex items-center gap-4">
                {/* Name and Description */}
                <div>
                    <div className="font-[Inter] font-semibold text-gray-900">
                        {category.name}
                    </div>
                    {category.description && (
                        <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate">
                            {category.description}
                        </div>
                    )}
                </div>
                
                {/* Active/Inactive Badge */}
                <button onClick={() => category.isActive ? onDeactivate(category) : onActivate(category)} className={`px-2 py-1 rounded text-xs font-medium ${
                    category.isActive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-200 text-gray-600"
                }`}>
                    {category.isActive ? "Active" : "Inactive"}
                </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <motion.button
                    onClick={() => onEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Edit category"
                >
                    <FaEdit size={16} />
                </motion.button>
                
                <motion.button
                    onClick={() => onDelete(category)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete category"
                >
                    <FaTrash size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}
