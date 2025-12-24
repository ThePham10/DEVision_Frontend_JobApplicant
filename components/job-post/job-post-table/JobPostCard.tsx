import { JobPost } from "./types"
import Badge from "@/components/reusable-component/Badge"
import { FaLocationDot, FaDollarSign, FaCalendar } from "react-icons/fa6"
import Button from "@/components/reusable-component/Button"
import SecondaryButton from "@/components/reusable-component/SecondaryButton"

const JobPostCard = ({ item, onViewDetail, onApply }: { item: JobPost, onViewDetail?: (job: JobPost) => void, onApply?: (job: JobPost) => void }) => {
    return (
        <div className="relative flex flex-col gap-4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Title + Employment Type Badge */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-[Inter] text-xl font-bold text-gray-900">
                        {item.title}
                    </h3>
                    <p className="font-[Inter] text-sm text-[#65758B] mt-1">
                        {item.company}
                    </p>
                </div>
                <Badge text={item.employmentType} />
            </div>

            {/* Info rows with icons */}
            <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <FaLocationDot />
                    <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaDollarSign />
                    <span>${item.minSalary.toLocaleString()} - ${item.maxSalary.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>Posted on 2025-11-10</span>
                </div>
            </div>

            {/* Skills badges */}
            <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, index) => (
                    <Badge key={index} text={skill} />
                ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-2">
                <Button style="w-full" text="View Details" onClick={() => onViewDetail?.(item)}/>
                <SecondaryButton style="w-full" text="Apply Now" onClick={() => onApply?.(item)}/>
            </div>
        </div>
    )
}

export default JobPostCard