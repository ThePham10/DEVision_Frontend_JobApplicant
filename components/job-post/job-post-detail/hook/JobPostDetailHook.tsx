"use client"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { loadJobPostById } from "../service/JobPostDetailService"
import { useJobPostTable } from "../../job-post-table/hook/JobPostTableHook"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store/authStore"
import { useSkillLookup } from "@/components/shared/hooks/useSkillLookup"

/**
 * Hook for job post detail
 * @param params - the job post id
 */
export const useJobPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    // Get the job post id from the params
    const resolvedParams = use(params)

    // Router for navigation
    const router = useRouter()

    // Get the job post table data
    const { hasApplied } = useJobPostTable()
    // Get the skill lookup data
    const { getSkillIcon, getSkillName } = useSkillLookup()

    // Get the authentication status
    const { isAuthenticated } = useAuthStore()
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Get the job post data
    const {
        data: jobPost,
        isLoading,
    } = useQuery({
        queryKey: ["jobPost", resolvedParams.id],
        queryFn: () => loadJobPostById(resolvedParams.id),
    })  

    return {
        router,
        jobPost,
        isLoading,
        isModalOpen,
        isAuthenticated,
        setIsModalOpen,
        hasApplied,
        getSkillIcon,
        getSkillName
    }
}