"use client"

import { JobApplicationList } from "@/components/job-application"
import { useAuthStore } from "@/store/authStore"

export default function MyApplicationsPage() {
    const { isAuthenticated } = useAuthStore()

    if (!isAuthenticated) {
        return null
    }

    return (
        <JobApplicationList />
    )
}
