import { uploadAvatar } from "../service/AvatarBoxService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { FormConfig, FormValues } from "@/components/headless-form/types/types"

const useAvatarBox = () => {
    const { user, isAuthenticated } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isAuthenticated || !user) return null;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

        const response = await uploadAvatar(formData);
        if (response?.status === 201) {
            console.log("Upload successful:", response.data);
            setIsModalOpen(false);
            // TODO: Update user avatar in store if needed
        }
    }

    return {
        user,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        formConfig,
        handleSubmit
    }
}

export { useAvatarBox }