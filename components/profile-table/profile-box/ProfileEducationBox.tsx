import Button from "@/components/reusable-component/Button";
import { mockProfile } from "../Data";
import ProfileEducationCard from "../profile-cards/ProfileEducationCard";
import Modal from "@/components/reusable-component/Modal";
import { useState } from "react";
import AddEducationForm from "../profile-forms/AddEducationForm";


const ProfileEducationBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (id: string) => {
        console.log("Deleting education:", id);
        setIsDeleteModalOpen(false);
    };
    
    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="font-[Inter] text-3xl font-bold">
                        Education
                    </div>

                    <div className="flex items-center gap-4">
                        <Button 
                            text="Add Education Degree" 
                            onClick={openAddModal}
                            style="flex items-center gap-2"
                        />
    
                        <Button 
                            text="Delete Education Degree" 
                            onClick={openDeleteModal}
                            style="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        />
                    </div>
                </div>
                
                <ProfileEducationCard item={mockProfile[0]} />
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
                <AddEducationForm
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
                    <p className="text-gray-600 font-[Inter]">Select an education entry to delete:</p>
                    <div className="flex flex-col gap-3">
                        {mockProfile[0].education.map((edu) => (
                            <div
                                key={edu.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <div className="font-semibold text-gray-900">{edu.degree} of {edu.fieldOfStudy}</div>
                                    <div className="text-sm text-gray-600">{edu.school}</div>
                                    <div className="text-xs text-gray-500">{edu.startYear} - {edu.endYear}</div>
                                </div>
                                <button
                                    onClick={() => handleDelete(edu.id)}
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

export default ProfileEducationBox;