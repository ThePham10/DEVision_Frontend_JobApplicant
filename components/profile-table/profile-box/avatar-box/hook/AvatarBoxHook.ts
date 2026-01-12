import { uploadAvatar } from "../service/AvatarBoxService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { FormConfig, FormValues } from "@/components/headless-form"
import { updateUserInfo } from "@/components/account-box/personal-box/api/PersonalBoxService";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Avatar box hook
 */
const useAvatarBox = () => {
    // Auth store
    const { user, isAuthenticated, setUser } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    if (!isAuthenticated || !user) return null;

    // Handle open modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    // Form config
    const formAvaConfig : FormConfig = {
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

    
    // Handle avatar submit
    const handleAvatarSubmit = async (values: FormValues) => {
        const file = values.avatar;
        
        // Check if file is selected
        if (!(file instanceof File)) {
            console.error("No file selected");
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "avatar");

        try {
            // Upload avatar
            const uploadResponse = await uploadAvatar(formData);
            
            // Check if upload was successful
            if (!uploadResponse?.data?.url) {
                console.error("Upload failed - no URL returned");
                return;
            }

            // Update user info
            const dbResponse = await updateUserInfo({ 
                avatarUrl: uploadResponse.data.url 
            });

            // Check if update was successful
            if (dbResponse?.status === 200) {
                console.log("Avatar updated successfully");
                if (user) {
                    setUser({
                        ...user,
                        avatarUrl: uploadResponse.data.url
                    })
                }
                queryClient.invalidateQueries({ queryKey: ['userInfo', user.id] });
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Avatar update failed:", error);
        }
    }

    return {
        user,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        formAvaConfig,
        handleAvatarSubmit
    }
}

export { useAvatarBox }