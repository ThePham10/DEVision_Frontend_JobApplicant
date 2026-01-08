import { Button, Modal } from "@/components/reusable-component";
import ProfileWorkExpCard from "./ProfileWorkExpCard";
import AddWorkExpForm from "./AddWorkExpForm";
import useWorkExpBox from "../hook/useWorkExpBox";

export const ProfileWorkExpBox = () => {
    const {
        isAuthenticated,
        user,
        userWorkExp,
        isModalOpen,
        deleteConfirm,
        setDeleteConfirm,
        openAddModal,
        closeAddModal,
        handleCreateSubmit,
        handleDelete,
    } = useWorkExpBox();

    if (!isAuthenticated || !user) return null;
    
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

                <div className="flex flex-col gap-6">
                    {userWorkExp?.map((exp) => (
                        <ProfileWorkExpCard 
                            key={exp.id}
                            item={exp} 
                            onDelete={setDeleteConfirm}
                        />
                    ))}
                </div>

            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeAddModal}
                title={"Add New Work Experience"}
                isDisplayedReturnLink={false}
                size="medium"
            >
                <AddWorkExpForm
                    onSubmit={handleCreateSubmit}
                    onCancel={closeAddModal}
                />
            </Modal>

            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to delete the Work Experience <strong>&quot;{deleteConfirm?.title}&quot;</strong>? 
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-[Inter]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter]"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}