import { useState } from "react"
import { useJobApplication } from "../hook/useJobApplication"
import { ApplicationFormData } from "../types"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Define the application modal props
interface applicationModalProps {
    jobId: string
    onClose: () => void
}

export const useApplicationModal = ({ jobId, onClose }: applicationModalProps) => {
    // State
    const router = useRouter()
    const { handleSubmit, isSubmitting } = useJobApplication()
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    // Query client
    const queryClient = useQueryClient()

    // Handle the cover letter updload change
    const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        
        // Check whether the file is exist
        if (!file) return

        // Validate file type
        if (file.type !== "application/pdf") {
            setError("Please upload a PDF or Word document for cover letter")
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Cover letter file size must be less than 5MB")
            return
        }

        setCoverLetterFile(file)
        setError("")
    }

    // Handle the cv upload change
    const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        // Check whether the file is exist
        if (!file) return

        // Validate file type
        if (file.type !== "application/pdf") {
            setError("Please upload a PDF or Word document for CV")
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("CV file size must be less than 5MB")
            return
        }

        setCvFile(file)
        setError("")
    }

    // Handle the job application form submission
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Check whether the CV file is uploaded
        if (!cvFile) {
            setError("Please upload your CV/Resume")
            return
        }

        // Create the form data
        const formData: ApplicationFormData = {
            jobId,
            coverLetterFile,
            cvFile
        }

        // Submit the form data
        createMutation.mutate(formData)
    }

    // Create application mutation
    const createMutation = useMutation({
        mutationFn: handleSubmit,
        onSuccess: (result) => {
            if (result === null) {
                setError("Failed to submit application. Please try again.")
                return
            }
            
            // Invalidate the query for refetch the job application and job post
            queryClient.invalidateQueries({ queryKey: ["job-applications"] })
            queryClient.invalidateQueries({ queryKey: ["job-posts"] })
            
            setSuccess(true)
            setTimeout(() => {
                onClose()
                router.push("/my-applications")
            }, 2000)
        },
        onError: () => {
            setError("Failed to submit application. Please try again.")
        }
    })

    // Handling the close model action
    const handleClose = () => {
        if (!isSubmitting) {
            setCoverLetterFile(null)
            setCvFile(null)
            setError("")
            setSuccess(false)
            onClose()
        }
    }

    return {
        coverLetterFile,
        cvFile,
        error,
        success,
        isSubmitting,
        handleCoverLetterFileChange,
        handleCvFileChange,
        handleFormSubmit,
        handleClose,
        setCoverLetterFile,
        setCvFile
    }
}