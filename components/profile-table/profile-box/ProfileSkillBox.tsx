import Button from "@/components/reusable-component/Button";
import { mockProfile } from "../Data";
import ProfileSkillCard from "../profile-cards/ProfileSkillCard";
import { useState } from "react";
import Modal from "@/components/reusable-component/Modal";
import AddSkillForm from "../profile-forms/AddSkillForm";
import Badge from "@/components/reusable-component/Badge";

const ProfileSkillBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (id: string) => {
        console.log("Deleting work experience:", id);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="font-[Inter] text-3xl font-bold">
                        Technical Skill
                    </div>
    
                    <div className="flex items-center gap-4">
                        <Button 
                            text="Add Technical Skill" 
                            onClick={openAddModal}
                            style="flex items-center gap-2"
                        />
    
                        <Button 
                            text="Delete Technical Skill" 
                            onClick={openDeleteModal}
                            style="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        />
                    </div>
                </div>
            
                <ProfileSkillCard item={mockProfile[0]} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title="Add New Education"
                isDisplayedReturnLink={false}
                size="medium"
            >
                <AddSkillForm
                    //onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setIsModalOpen(false);
                    }}
                    //isLoading={isSubmitting}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Education"
                isDisplayedReturnLink={false}
                size="medium"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 font-[Inter]">Select a technical skill to delete:</p>
                    <div className="flex flex-col gap-3">
                        {mockProfile[0].skills.map((skill, index) => (
                            <div
                                key={skill.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <Badge key={index} text={skill.name} />

                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter]"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
        
    )
}

export default ProfileSkillBox;