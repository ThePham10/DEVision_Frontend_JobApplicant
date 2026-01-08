import { Button, Modal } from "@/components/reusable-component";
import { mockProfile } from "../../../Data";
import ProfileWorkExpCard from "./ProfileWorkExpCard";
import { use, useState } from "react";
import AddWorkExpForm from "./AddWorkExpForm";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperiences } from "../api/WorkExpService";

export const ProfileWorkExpBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { isAuthenticated, user } = useAuthStore();
    const queryClient = useQueryClient();

    const openAddModal = () => {
        setEditingId(null);
        setIsModalOpen(true);
    };

    const { data: fetchedData } = useQuery({
        queryKey: ['userWorkExp', user?.id],
        queryFn: () => {
            if (!user) throw new Error("User not found");
            return getWorkExperiences(user.id);
        },
        enabled: isAuthenticated && !!user,
    });

    const userWorkExp = fetchedData?.data;

    if (!isAuthenticated || !user) return null;

    const handleEdit = (id: string) => {
        console.log("Editing work experience:", id);
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        // TODO: Add confirmation dialog and actual delete logic
        console.log("Deleting work experience:", id);
    };
    
    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Work Experience
                    </h2>

                    <Button 
                        text="Add Work Experience" 
                        onClick={openAddModal}
                        style="flex items-center gap-2"
                    />
                </div>

                {userWorkExp?.map((exp) => (
                    <ProfileWorkExpCard 
                        key={exp.id}
                        item={exp} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))} 


            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                }}
                title={editingId ? "Edit Work Experience" : "Add New Work Experience"}
                isDisplayedReturnLink={false}
                size="medium"
            >
                <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">New Work Experience Form</h2>
                <AddWorkExpForm
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingId(null);
                    }}
                />
            </Modal>
        </div>
    )
}