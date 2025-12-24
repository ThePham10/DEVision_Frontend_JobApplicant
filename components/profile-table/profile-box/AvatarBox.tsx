"use client"

import { AvatarFrame } from "@/components/reusable-component/AvatarFrame"
import { EditButton } from "@/components/reusable-component/EditButton"
import { useAuthStore } from "@/store/authStore";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/reusable-component/Modal";
import type { FormConfig, FormValues } from "@/components/headless-form/types/types";
import { HeadlessForm } from "@/components/headless-form/Form";
import { httpHelper } from "@/utils/httpHelper";

const AvatarBox = () => {
    const { user, isAuthenticated } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isAuthenticated || !user) return null;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const formConfig : FormConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "",
                name: "avatar",
                type: "file",
                placeholder: "Upload avatar",
                validation: {
                    required: true,
                    requiredMessage: "Please upload an avatar",
                }
            }
        ],
        buttonText: "Upload"
    }

    const handleSubmit = async (values: FormValues) => {
        try {
            const file = values.avatar;
            
            // Ensure we have a file
            if (!(file instanceof File)) {
                console.error("No file selected");
                return;
            }

            // Create FormData for file upload
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "avatar");

            const response = await httpHelper.post("/storage/upload", formData);
            if (response.status === 201) {
                console.log("Upload successful:", response.data);
                setIsModalOpen(false);
                // TODO: Update user avatar in store if needed
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }
    
    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Gradient decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex items-center gap-8">
                <div className="relative">
                    <AvatarFrame size={130} className="rounded-full" />
                    <EditButton onClick={handleOpenModal} />
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
                        {user.name}
                    </h2>
                    {user.country && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPinned className="w-4 h-4 text-blue-500" />
                            <span className="text-base">{user.country}</span>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Upload avatar</h2>
                <HeadlessForm config={formConfig} onSubmit={handleSubmit} />
            </Modal>
        </div>
    )
}

export default AvatarBox;