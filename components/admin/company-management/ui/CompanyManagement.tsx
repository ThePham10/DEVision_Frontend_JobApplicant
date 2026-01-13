"use client";

import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/reusable-component/Button";
import { AnimatePresence } from "framer-motion";
import CompanyManagementCard from "./CompanyManagementCard";
import useCompanyManagement from "../hook/CompanyManagementHook";
import { FaTimes } from "react-icons/fa";
import { Modal } from "@/components/reusable-component/Modal";

const CompanyManagement = () => {
    const {
        companies,
        allCompaniesCount,
        searchTerm,
        setSearchTerm,
        isLoading,
        hasNextPage,
        handleLoadMore,
        handleSearch,
        clearFilters,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
    } = useCompanyManagement();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-[Inter] text-gray-900">
                        Company Management
                    </h1>
                    <p className="text-gray-500 font-[Inter]">
                        Manage companies in the system
                    </p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-[Inter] text-lg font-semibold mb-4">Search Company</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name or email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <Button text="Search" />
                </div>
                
                {searchTerm && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            Name or Email with: {searchTerm}
                            <FaTimes 
                                onClick={() => {
                                    setSearchTerm("");
                                }}
                                className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            />
                        </span>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>
            
            {/* Pagination and Company Count Section */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 font-[Inter]">
                    Showing {companies.length} of {allCompaniesCount} companies
                    {isLoading && <span className="ml-2 text-blue-500">(Updating...)</span>}
                </div>
            </div>
            
            <div className="flex flex-col gap-3">
                {isLoading && companies.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading companies...
                    </div>
                ) : companies.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No companies found.
                    </div>
                ) : (
                    <AnimatePresence>
                        {companies.map((company) => (
                            <CompanyManagementCard
                                key={company.id}
                                company={company}
                                onDelete={setDeleteConfirm}
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

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to delete <strong>&quot;{deleteConfirm?.companyName}&quot;</strong> account?
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
                            disabled={!deleteConfirm}
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

export default CompanyManagement;