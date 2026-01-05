"use client";

import { JobCategory } from "../types";
import { Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { icons } from "@/components/reusable-component";

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
            key={category.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            {/* Left section: Name, Description, Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                {/* Name and Description */}
                <div>
                    {(() => {
                        const Icon = icons[category.icon || "Other"];
                        return <Icon className="w-6 h-6 text-black font-bold" />;
                    })()}
                </div>
                <div className="font-[Inter] font-semibold text-sm sm:text-base text-gray-900">
                    {category.name}
                    {category.description && (
                        <div className="font-[Inter] font-normal text-xs sm:text-sm text-gray-500 truncate">
                            {category.description}
                        </div>
                    )}
                </div>                
                {/* Active/Inactive Badge */}
                <button 
                    onClick={() => category.isActive ? onDeactivate(category) : onActivate(category)} 
                    className={`self-start sm:self-center px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
                        category.isActive 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-200 text-gray-600"
                    }`}
                >
                    {category.isActive ? "Active" : "Inactive"}
                </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center">
                <motion.button
                    onClick={() => onEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Edit category"
                >
                    <Edit size={16} />
                </motion.button>
                
                <motion.button
                    onClick={() => onDelete(category)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete category"
                >
                    <Trash size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}
