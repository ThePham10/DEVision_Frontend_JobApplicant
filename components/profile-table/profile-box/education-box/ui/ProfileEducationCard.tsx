import { Education } from "../types"
import { motion } from "motion/react";
import { Pencil, University, Trash2, AtSign } from "lucide-react";

// Define the profile education card props
type ProfileEducationCardProps = {
    educationList: Education[];
    openEditModal: (education: Education) => void;
    onDelete: (education: Education) => void;
};

/**
 * Profile education card component
 * @param education list
 * @param openEditModal function to open edit modal
 * @param onDelete function to delete education
 */
const ProfileEducationCard = ({ educationList, openEditModal, onDelete }: ProfileEducationCardProps) => {
    // Function to convert timestamp to month-year format
    function convertTime(timestamp: string): string {
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
        const year = date.getFullYear();
        return `${month}-${year}`;
    }

    return (
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {educationList.map((educationItem) => (
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
                            <span className="font-[Inter] text-lg font-bold text-gray-900 mb-1">
                                {educationItem.levelStudy} of {educationItem.major} 
                            </span>

                            <span className="flex items-center gap-2 text-gray-600">
                                <AtSign className="w-4 h-4" />
                                {educationItem.schoolName}
                            </span>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{convertTime(educationItem.startDate)} - {educationItem.endDate ? convertTime(educationItem.endDate) : "Present"}</span>
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
                                onClick={() => openEditModal(educationItem)}
                                className="p-2 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
                                title="Edit"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(educationItem)}
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