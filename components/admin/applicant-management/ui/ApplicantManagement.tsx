"use client";

import { Search, X } from "lucide-react";
import { Button, Modal} from "@/components/reusable-component";
import { AnimatePresence } from "framer-motion";
import ApplicantManagementCard from "../applicant-management-card/ui/ApplicantManagementCard";
import useApplicantManagement from "../hook/ApplicantManagementHook";

export const ApplicantManagement = () => {

    const {
        allApplicants,
        totalApplicantsCount,
        hasNextPage,
        isLoading,
        handleLoadMore,
        deactivateConfirm,
        setDeactivateConfirm,
        activateConfirm,
        setActivateConfirm,
        handleDeActivate,
        handleActivate
    } = useApplicantManagement();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-[Inter] text-gray-900">
                        Applicant Account Management
                    </h1>
                    <p className="text-gray-500 font-[Inter]">
                        Manage applicant accounts in the system
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-lg font-semibold mb-4">Search Applicant Account</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            //value={searchName}
                            //onChange={(e) => setSearchName(e.target.value)}
                            //onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <Button text="Search" />
                </div>
                
                {/* {(filters.name !== undefined) && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        {filters.name && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Name: {filters.name}
                                <X
                                    onClick={() => {
                                        setSearchName("");
                                        setFilters(prev => ({ ...prev, name: undefined }));
                                    }}
                                    className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                />
                            </span>
                        )}
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                )} */}
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 font-[Inter]">
                    Showing {allApplicants.length} of {totalApplicantsCount} applicants
                    {isLoading && <span className="ml-2 text-blue-500">(Updating...)</span>}
                </div>
            </div>
            
            <div className="flex flex-col gap-3">
                {isLoading && allApplicants.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading applicants...
                    </div>
                ) : allApplicants.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No applicants found.
                    </div>
                ) : (
                    <AnimatePresence>
                        {allApplicants.map((applicant) => (
                            <ApplicantManagementCard
                                key={applicant.id}
                                applicant={applicant}
                                onDeactivate={setDeactivateConfirm}
                                onActivate={setActivateConfirm}
                            />
                            
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {hasNextPage && (
                <div className="flex justify-center">
                    <Button 
                        text={isLoading ? "Loading..." : "Load More"} 
                        onClick={handleLoadMore}
                    />
                </div>
            )}

            <Modal
                isOpen={!!activateConfirm}
                onClose={() => setActivateConfirm(null)}
                title="Confirm Activation"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to activate <strong>&quot;{activateConfirm?.name}&quot;</strong> account?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setActivateConfirm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-[Inter]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => activateConfirm && handleActivate(activateConfirm)}
                            disabled={!activateConfirm}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-[Inter] disabled:opacity-50"
                        >
                            {isLoading ? "Activating..." : "Activate"}
                        </button>
                    </div>
                </div>
            </Modal>
            
            <Modal
                isOpen={!!deactivateConfirm}
                onClose={() => setDeactivateConfirm(null)}
                title="Confirm Deactivation"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to deactivate <strong>&quot;{deactivateConfirm?.name}&quot;</strong> account?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeactivateConfirm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-[Inter]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => deactivateConfirm && handleDeActivate(deactivateConfirm)}
                            disabled={!deactivateConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter] disabled:opacity-50"
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    ) 
}