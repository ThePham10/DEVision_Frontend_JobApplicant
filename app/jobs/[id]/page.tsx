"use client"

import { JobPostDetail } from "@/components/job-post"

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <JobPostDetail
            params={params}
        />
    )
}
