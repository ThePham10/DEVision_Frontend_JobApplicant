"use client";

import JobPostFilterForm from "../JobPostFilterForm"

const JobPostFilterBox = () => {
    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-6">
                <div className="font-[Inter] text-3xl font-bold mb-4">
                    Search Filters
                </div>
                <div className="font-[Inter] text-[#65758B] mb-4">
                    Find jobs that match your criteria
                </div>
            </div>
            
            <JobPostFilterForm/>  
        </div>
    )
}

export default JobPostFilterBox
