import Badge from "@/components/reusable-component/Badge";
import { JobPost } from "../types";
import { MapPinned, DollarSign, Calendar } from "lucide-react";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";

interface JobPostDetailProps {
    job: JobPost;
}

const JobPostDetail = ({ job }: JobPostDetailProps) => {
    return (
        <div className="flex flex-col gap-5">
            {/* Header: Title + Employment Type Badge */}
            <div className="flex items-center justify-between jobs-start">
                <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                        {job.title}
                    </h3>
                    <p className="text-xl text-[#65758B] mt-1">
                        {job.company}
                    </p>
                </div>
                <Badge text={job.employmentType} />
            </div>

            {/* Info rows with icons */}
            <div className="flex flex-col gap-5 text-gray-600">
                <div className="flex jobs-center gap-2">
                    <MapPinned />
                    <div>{job.location}</div>
                </div>
                <div className="flex jobs-center gap-2">
                    <DollarSign />
                    <span>${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}</span>
                </div>
                <div className="flex jobs-center gap-2">
                    <Calendar />
                    <span>Posted on 2025-11-10</span>
                </div>
            </div>

            {/* Skills badges */}
            <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                    <Badge key={index} text={skill} />
                ))}
            </div>

            <SecondaryButton text="Apply now" />

            <span className="text-2xl font-bold">About this job</span>

            <span className="text-justify whitespace-pre-line">{job.description}</span>
        </div>
    )
}


export default JobPostDetail