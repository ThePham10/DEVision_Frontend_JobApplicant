"use client"

import { JobPostDetail } from "@/components/job-post"

// Mock job data - replace with actual API call

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <JobPostDetail
            params={params}
        />
    )
}
