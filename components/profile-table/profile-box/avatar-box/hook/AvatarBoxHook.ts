import { uploadAvatar } from "../service/AvatarBoxService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { FormConfig, FormValues } from "@/components/headless-form"
import { updateUserInfo } from "@/components/account-box/personal-box/api/PersonalBoxService";
import { useQueryClient } from "@tanstack/react-query";

const useAvatarBox = () => {
    const { user, isAuthenticated, setUser } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isAuthenticated || !user) return null;
    const queryClient = useQueryClient();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

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

    

    const handleAvatarSubmit = async (values: FormValues) => {
    const file = values.avatar;
        
    if (!(file instanceof File)) {
        console.error("No file selected");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "avatar");

    try {
        const uploadResponse = await uploadAvatar(formData);
        
        if (!uploadResponse?.data?.url) {
            console.error("Upload failed - no URL returned");
            return;
        }

        const dbResponse = await updateUserInfo({ 
            avatarUrl: uploadResponse.data.url 
        });

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