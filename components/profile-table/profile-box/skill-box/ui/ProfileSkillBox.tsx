import { Button, Modal } from "@/components/reusable-component";
import { mockProfile } from "../../../Data";
import ProfileSkillCard from "../ui/ProfileSkillCard";
import { useState } from "react";
import AddSkillForm from "./AddSkillForm";

export const ProfileSkillBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        // TODO: Add confirmation and actual delete logic
        console.log("Deleting skill:", id);
    };

    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Technical Skills
                    </h2>
    
                    <Button 
                        text="Add Skill" 
                        onClick={openAddModal}
                        style="flex items-center gap-2"
                    />
                </div>
                
                <p className="text-gray-500 text-sm mb-6">
                    Hover over a skill and click the × to remove it
                </p>
            
                <ProfileSkillCard 
                    item={mockProfile[0]} 
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title="Add New Skill"
                isDisplayedReturnLink={false}
                size="medium"
            >
                <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">New Skill Form</h2>
                <AddSkillForm
                    onCancel={() => {
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    )
}