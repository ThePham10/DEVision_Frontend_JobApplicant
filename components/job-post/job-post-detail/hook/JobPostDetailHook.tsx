"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { loadJobPostById } from "../service/JobPostDetailService"
import { useJobPostTable } from "../../job-post-table/hook/JobPostTableHook"
import { useQuery } from "@tanstack/react-query"

export const useJobPostDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params)
    const router = useRouter()
    const { hasApplied } = useJobPostTable()
    
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
        setIsModalOpen,
        hasApplied,
    }
}