import { JobPost } from "../types"
import { Badge, Button, SecondaryButton } from "@/components/reusable-component"
import { MapPinned, DollarSign, Calendar } from "lucide-react"
import { useSkillLookup } from "@/components/shared/hooks/useSkillLookup"
import { icons } from "@/components/reusable-component"

/**
 * Job post card component
 * @param item - job post item
 * @param onViewDetail - view detail callback
 * @param onApply - apply callback
 * @param isApplied - check if user has applied for the job
 * @param isAuthenticated - check if user is authenticated
 */
const JobPostCard = ({ item, onViewDetail, onApply, isApplied, isAuthenticated }: { item: JobPost, onViewDetail?: (job: JobPost) => void, onApply: (job: JobPost) => void, isApplied: boolean, isAuthenticated: boolean }) => {
    // Skill lookup hook
    const { getSkillName, getSkillIcon } = useSkillLookup();

    return (
        <div className="relative flex flex-col gap-3 sm:gap-4 border border-gray-200 bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Title + Employment Type Badge */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                    <h3 className="font-[Inter] text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {item.title}
                    </h3>
                    <p className="font-[Inter] text-sm text-[#65758B] mt-1">
                        {item.companyName}
                    </p>
                </div>
                <Badge text={item.employmentType} />
            </div>

            {/* Info rows with icons */}
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <MapPinned className="flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="flex-shrink-0" />
                    <span>{item.salaryDisplay}</span>
                </div>
                {item.postedDate && (
                    <div className="flex items-center gap-2">
                        <Calendar className="flex-shrink-0" />
                        <span>Posted {new Date(item.postedDate).toLocaleDateString()}</span>
                    </div>
                )}
                {item.expireDate && (
                    <div className="flex items-center gap-2">
                        <Calendar className="flex-shrink-0" />
                        <span>Expires {new Date(item.expireDate).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
            
            {/* Skills badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.skills.slice(0, 5).map((skillId, index) => {
                    const iconKey = getSkillIcon(skillId);
                    const IconComponent = iconKey ? icons[iconKey] : null;
                    return (
                        <span 
                            key={index} 
                            className="h-9 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                            {IconComponent && <IconComponent className="w-3 h-3" />}
                            {getSkillName(skillId)}
                        </span>
                    );
                })}
                {item.skills.length > 5 && (
                    <span className="text-xs text-gray-500 self-center">+{item.skills.length - 5} more</span>
                )}
            </div>
            
            {/* Action buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                <Button style="w-full sm:flex-1" text="View Details" onClick={() => onViewDetail?.(item)}/>
                {isAuthenticated && !isApplied && <SecondaryButton style="w-full sm:flex-1" text="Apply Now" onClick={() => onApply(item)}/>}
            </div>
        </div>
    )
}

export default JobPostCard