"use client"

import { MapPinned } from "lucide-react";
import { Modal, AvatarFrame, EditButton } from "@/components/reusable-component";
import { HeadlessForm } from "@/components/headless-form";
import { useAvatarBox } from "../hook/AvatarBoxHook";

export const AvatarBox = () => {
    const avatarBoxData = useAvatarBox();
    
    // Return null or a placeholder if not authenticated
    if (!avatarBoxData) return null;

    const {
        user,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        formAvaConfig,
        handleAvatarSubmit
    } = avatarBoxData;
    
    return (
        <div className="relative">

                    
            <div className="relative z-10 flex items-center gap-8"> 
                <div className="relative">
                    <AvatarFrame size={130} className="rounded-full" />
                    <EditButton onClick={handleOpenModal} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold mb-4">Upload avatar</h2>
                <HeadlessForm config={formAvaConfig} onSubmit={handleAvatarSubmit} />
            </Modal>
        </div>
    )
}