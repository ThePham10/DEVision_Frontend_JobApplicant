import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { icons } from "@/components/reusable-component"
import { useSkillLookup } from "@/components/shared/hooks/useSkillLookup";

type ProfileSkillCardProps = {
    item: string[];
    onDelete?: (id: string) => void;
};

const ProfileSkillCard = ({ item, onDelete }: ProfileSkillCardProps) => {
    const { getSkillIcon, getSkillName } = useSkillLookup()

    return (
        <div className="flex flex-wrap gap-3">
            <AnimatePresence>
                {item.map((skill, index) => {
                    const iconKey = getSkillIcon(skill);
                    const IconComponent = iconKey ? icons[iconKey] : null;
                    
                    return (
                        <motion.div
                            key={skill}
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
                                <span 
                                    key={index} 
                                    className="inline-flex items-center gap-1 px-2 py-1 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                    {getSkillName(skill)}
                                </span>
                                
                                {/* Delete button - appears on hover */}
                                {onDelete && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(skill);
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
            
            {item.length === 0 && (
                <div className="text-gray-400 text-sm italic">
                    No skills added yet. Click &quot;Add Skill&quot; to get started.
                </div>
            )}
        </div>
    );
};

export default ProfileSkillCard;