import { Button, Modal } from "@/components/reusable-component";
import { mockProfile } from "../../../Data";
import ProfileEducationCard from "../ui/ProfileEducationCard";
import { useState } from "react";
import AddEducationForm from "./AddEducationForm";


export const ProfileEducationBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const openAddModal = () => {
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        console.log("Editing education:", id);
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        // TODO: Add confirmation dialog and actual delete logic
        console.log("Deleting education:", id);
    };
    
    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Education
                    </h2>

                    <Button 
                        text="Add Education" 
                        onClick={openAddModal}
                        style="flex items-center gap-2"
                    />
                </div>
                
                <ProfileEducationCard 
                    item={mockProfile[0]} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                }}
                title={editingId ? "Edit Education" : "Add New Education"}
                isDisplayedReturnLink={false}
                size="medium"
            >
                <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">New Education Form</h2>
                <AddEducationForm
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingId(null);
                    }}
                />
            </Modal>
        </div>
    )
}