import { Profile as ProfileType } from "../types/types";
import { motion } from "motion/react";
import { Pencil, University, Trash2 } from "lucide-react";

type ProfileEducationCardProps = {
    item: ProfileType;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

const ProfileEducationCard = ({ item, onEdit, onDelete }: ProfileEducationCardProps) => {
    return (
        <div className="flex flex-col gap-4">
            {item.education.map((educationItem) => (
                <motion.div 
                    key={educationItem.id} 
                    className="group relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                    <div className="relative flex gap-4 bg-gradient-to-br from-white to-slate-50 border border-gray-200/80 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                            <University className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-[Inter] text-lg font-bold text-gray-900 mb-1">
                                {educationItem.degree} of {educationItem.fieldOfStudy}
                            </h3>
                            <p className="text-gray-600 text-sm mb-1">{educationItem.school}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{educationItem.startYear} - {educationItem.endYear}</span>
                                {educationItem.gpa && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        GPA: {educationItem.gpa}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Action buttons - appear on hover */}
                        <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={() => onEdit?.(educationItem.id)}
                                className="p-2 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                                title="Edit"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete?.(educationItem.id)}
                                className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ProfileEducationCard;