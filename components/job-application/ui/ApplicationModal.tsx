"use client"

import { useState } from "react"
import Modal from "@/components/reusable-component/Modal"
import Button from "@/components/reusable-component/Button"
import { useJobApplication } from "../hook/useJobApplication"
import { ApplicationFormData } from "../types"
import { useRouter } from "next/navigation"
import { Upload, FileText, X } from "lucide-react"

type ApplicationModalProps = {
    isOpen: boolean
    onClose: () => void
    jobId: string
    jobTitle: string
    company: string
}

export default function ApplicationModal({ isOpen, onClose, jobId, jobTitle, company }: ApplicationModalProps) {
    const router = useRouter()
    const { handleSubmit, isSubmitting } = useJobApplication()
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
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

    const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!cvFile) {
            setError("Please upload your CV/Resume")
            return
        }

        const formData: ApplicationFormData = {
            jobId,
            coverLetterFile,
            cvFile
        }

        const result = await handleSubmit(formData)

        if (result) {
            setSuccess(true)
            setTimeout(() => {
                onClose()
                router.push("/my-applications")
            }, 2000)
        } else {
            setError("Failed to submit application. Please try again.")
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            setCoverLetterFile(null)
            setCvFile(null)
            setError("")
            setSuccess(false)
            onClose()
        }
    }

    if (success) {
        return (
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">Redirecting to your applications...</p>
                </div>
            </Modal>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Position</h2>
                <p className="text-gray-600 mb-6">
                    <span className="font-semibold">{jobTitle}</span> at {company}
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Cover Letter */}
                    <div>
                        <label htmlFor="coverLetterFile" className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter <span className="text-gray-500 text-xs">(Optional)</span>
                        </label>
                        
                        {!coverLetterFile ? (
                            <label 
                                htmlFor="coverLetterFile" 
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload Cover Letter (Optional)</span>
                                <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</span>
                                <input
                                    id="coverLetterFile"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleCoverLetterFileChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{coverLetterFile.name}</p>
                                        <p className="text-xs text-gray-600">{(coverLetterFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCoverLetterFile(null)}
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* CV Upload */}
                    <div>
                        <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
                            CV/Resume *
                        </label>
                        
                        {!cvFile ? (
                            <label 
                                htmlFor="cv" 
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload CV/Resume</span>
                                <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</span>
                                <input
                                    id="cv"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleCvFileChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{cvFile.name}</p>
                                        <p className="text-xs text-gray-600">{(cvFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCvFile(null)}
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <Button
                            text={isSubmitting ? "Submitting..." : "Submit Application"}
                            type="submit"
                            style="flex-1"
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
