import { JobPost } from "../types"
import { Badge, Button, SecondaryButton } from "@/components/reusable-component"
import { MapPinned, DollarSign, Calendar } from "lucide-react"

const JobPostCard = ({ item, onViewDetail, onApply, isApplied, isAuthenticated }: { item: JobPost, onViewDetail?: (job: JobPost) => void, onApply: (job: JobPost) => void, isApplied: boolean, isAuthenticated: boolean }) => {
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
                        <span>Expiry {new Date(item.expireDate).toLocaleDateString()}</span>
                    </div>
                )}
            </div>

            {/* Skills badges */}
            {/* <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} text={skill} />
                ))}
                {item.skills.length > 5 && (
                    <span className="text-xs text-gray-500 self-center">+{item.skills.length - 5} more</span>
                )}
            </div> */}

            {/* Action buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                <Button style="w-full sm:flex-1" text="View Details" onClick={() => onViewDetail?.(item)}/>
                {isAuthenticated && !isApplied && <SecondaryButton style="w-full sm:flex-1" text="Apply Now" onClick={() => onApply(item)}/>}
            </div>
        </div>
    )
}

export default JobPostCard