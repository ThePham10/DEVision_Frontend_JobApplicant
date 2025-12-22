import Button from "@/components/reusable-component/Button";
import { mockProfile } from "../Data";
import ProfileWorkExpCard from "../profile-cards/ProfileWorkExpCard";
import Modal from "@/components/reusable-component/Modal";
import { useState } from "react";
import AddWorkExpForm from "../profile-forms/AddWorkExpForm";


const ProfileWorkExpBox = () => {
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
                        Work Experience
                    </div>

                <div className="flex items-center gap-4">
                    <Button 
                        text="Add Work Experience" 
                        onClick={openAddModal}
                        style="flex items-center gap-2"
                    />

                    <Button 
                        text="Delete Work Experience" 
                        onClick={openDeleteModal}
                        style="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    />
                </div>
            </div>

            <ProfileWorkExpCard item={mockProfile[0]} />
            
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title="Add New Education"
                isDisplayedReturnLink={false}
                size="medium"
            >
                <AddWorkExpForm
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
                title="Delete Work Experience"
                isDisplayedReturnLink={false}
                size="medium"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 font-[Inter]">Select a work experience to delete:</p>
                    <div className="flex flex-col gap-3">
                        {mockProfile[0].workExperience.map((work) => (
                            <div
                                key={work.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <div className="font-semibold text-gray-900">{work.jobTitle}</div>
                                    <div className="text-xs text-gray-500">{work.startDate} - {work.endDate}</div>
                                    <div className="text-xs text-gray-500">{work.jobDescription} </div>

                                </div>
                                <button
                                    onClick={() => handleDelete(work.id)}
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
        </div>
    )
}

export default ProfileWorkExpBox;