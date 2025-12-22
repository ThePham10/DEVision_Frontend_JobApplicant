import { Profile as ProfileType } from "../types/types";
import { motion } from "motion/react";
import { Pencil, Trash2, BriefcaseBusiness } from "lucide-react";

type ProfileWorkExpCardProps = {
    item: ProfileType;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

const ProfileWorkExpCard = ({ item, onEdit, onDelete }: ProfileWorkExpCardProps) => {
    return (
        <div className="flex flex-col gap-4">
            {item.workExperience.map((workExpItem) => (
                <motion.div 
                    key={workExpItem.id} 
                    className="group relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                    <div className="relative flex gap-4 bg-gradient-to-br from-white to-slate-50 border border-gray-200/80 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                            <BriefcaseBusiness className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-[Inter] text-lg font-bold text-gray-900 mb-1">
                                {workExpItem.jobTitle}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                {workExpItem.startDate} - {workExpItem.endDate}
                            </p>
                            <p className="text-gray-500 text-sm line-clamp-2">
                                {workExpItem.jobDescription}
                            </p>
                        </div>
                        
                        {/* Action buttons - appear on hover */}
                        <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                onClick={() => onEdit?.(workExpItem.id)}
                                className="p-2 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                                title="Edit"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete?.(workExpItem.id)}
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

export default ProfileWorkExpCard;