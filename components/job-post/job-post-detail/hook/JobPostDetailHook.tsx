"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJobApplication } from "@/components/job-application"
import { loadJobPostById } from "../service/JobPostDetailService"
import { JobPost } from "../../types"

export const useJobPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params)
    const router = useRouter()
    const { checkIfApplied } = useJobApplication()
    
    const [job, setJob] = useState<JobPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasAppliedToJob, setHasAppliedToJob] = useState(false)

    useEffect(() => {
        const loadJobDetails = async () => {
            setLoading(true)
            try {
                const jobData = await loadJobPostById(resolvedParams.id)
                setJob(jobData)
                
                // Check if already applied
                const applied = await checkIfApplied(resolvedParams.id)
                setHasAppliedToJob(applied)
            } catch (error) {
                console.error("Failed to load job:", error)
            } finally {
                setLoading(false)
            }
        }

        loadJobDetails()
    }, [resolvedParams.id, checkIfApplied])

    return {
        router,
        job,
        loading,
        isModalOpen,
        setIsModalOpen,
        hasAppliedToJob,
        setHasAppliedToJob
    }
}