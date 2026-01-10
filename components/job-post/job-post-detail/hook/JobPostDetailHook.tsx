"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { loadJobPostById } from "../service/JobPostDetailService"
import { useJobPostTable } from "../../job-post-table/hook/JobPostTableHook"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store/authStore"
import { useSkillLookup } from "@/components/shared/hooks/useSkillLookup"

export const useJobPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params)
    const router = useRouter()
    const { hasApplied } = useJobPostTable()
    const { getSkillIcon, getSkillName } = useSkillLookup()

    const { isAuthenticated } = useAuthStore()
    
    const [isModalOpen, setIsModalOpen] = useState(false)

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