import { Profile as ProfileType } from "../types/types";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

type ProfileSkillCardProps = {
    item: ProfileType;
    onDelete?: (id: string) => void;
};

// Helper function to get Lucide icon by name
const getIconByName = (iconName?: string): LucideIcon => {
    if (!iconName) return LucideIcons.Code;
    
    // Try to get the icon from lucide-react
    const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
    return icon || LucideIcons.Code; // Fallback to Code icon
};

const ProfileSkillCard = ({ item, onDelete }: ProfileSkillCardProps) => {
    return (
        <div className="flex flex-wrap gap-3">
            <AnimatePresence>
                {item.skills.map((skill, index) => {
                    const IconComponent = getIconByName(skill.icon);
                    
                    return (
                        <motion.div
                            key={skill.id}
                            className="group relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 25,
                                delay: index * 0.05 
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-full shadow-sm group-hover:shadow-md group-hover:border-blue-300 transition-all duration-200">
                                <IconComponent className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                                    {skill.name}
                                </span>
                                
                                {/* Delete button - appears on hover */}
                                {onDelete && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(skill.id);
                                        }}
                                        className="ml-1 p-0.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                                        title="Remove skill"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            
            {item.skills.length === 0 && (
                <div className="text-gray-400 text-sm italic">
                    No skills added yet. Click &quot;Add Skill&quot; to get started.
                </div>
            )}
        </div>
    );
};

export default ProfileSkillCard;