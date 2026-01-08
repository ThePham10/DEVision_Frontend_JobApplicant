import { WorkExpData } from "../types";
import { motion } from "motion/react";
import { Pencil, Trash2, BriefcaseBusiness } from "lucide-react";
import { useDataStore } from "@/store";

type ProfileWorkExpCardProps = {
    item: WorkExpData ;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};



const ProfileWorkExpCard = ({ item, onEdit, onDelete }: ProfileWorkExpCardProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const { skills } = useDataStore(); 

    const userWorkExpSkills = skills.filter(skill => item.skillCategories.includes(skill.id));

    return (
        <div className="flex flex-col gap-4">

            <motion.div 
                key={item.id} 
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
                            {item.title}
                            
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                            {item.description}
                        </p>

                        {userWorkExpSkills && userWorkExpSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {userWorkExpSkills.map((skill: any) => (
                                    <span 
                                        key={skill.id}
                                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:shadow-md transition-shadow duration-200"
                                    >
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                        {skill.name}
                                        {skill.icon && (<img src={skill.icon} alt={skill.name} className="w-3 h-3 ml-1" />)}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Action buttons - appear on hover */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onEdit?.(item.id)}
                            className="p-2 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                            title="Edit"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete?.(item.id)}
                            className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileWorkExpCard;