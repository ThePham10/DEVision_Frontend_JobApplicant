"use client";

import { useEffect, useState } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { FaSearch, FaTimes } from "react-icons/fa";
import Button from "@/components/reusable-component/Button";
import { loadApplicants } from "../service/ApplicantManagementService";
import { AnimatePresence } from "framer-motion";
import ApplicantManagementCard from "./ApplicantManagementCard";
import Modal from "@/components/reusable-component/Modal";

const ApplicantManagement = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [subscriptionFilter, setSubscriptionFilter] = useState("");
    const [filters, setFilters] = useState<ApplicantFilters>({});

    const [applicants, setApplicants] = useState<ApplicantAccount[]>([]);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [deleteConfirm, setDeleteConfirm] = useState<ApplicantAccount | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const loading = isLoading || isFetching;

    const handleDelete = async () => {
        if (deleteConfirm) {
            setIsLoading(true);
            
            try {
                setApplicants(
                    prev => prev.filter(
                        applicant => applicant.id !== deleteConfirm.id
                    )
                );
                setTotal(prev => prev - 1);
                setDeleteConfirm(null);
            } catch (err) {
                console.error("Failed to delete applicant:", err);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const fetchApplicants = async () => {
        setIsLoading(true);
        setIsFetching(true);
        
        try {
            const response = await loadApplicants(page, 10, filters);
            setApplicants(response.data);
            setTotal(response.total);
            setHasMore(response.hasMore);
        } catch (err) {
            console.error("Failed to load applicants:", err);
        } finally {
            setIsFetching(false);
            setIsLoading(false);
        }
    };

    // Fetch data whenever page or filters change
    useEffect(() => {
        fetchApplicants();

    }, [page, filters]);

    const handleSearch = () => {
        setPage(1); // Reset to first page when searching
        setFilters({
            name: searchTerm || undefined,
            emailVerified: emailFilter === "" ? undefined : emailFilter === "active",
            subscription: subscriptionFilter === "" ? undefined : subscriptionFilter === "active",
        });
    };
    
    const clearFilters = () => {
        setFilters({});
        setSearchTerm("");
        setEmailFilter("");
        setSubscriptionFilter("");
        setPage(1);
    };

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
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                        />
                    </div>
                    
                    <select
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter] bg-white"
                    >   
                        <option value="">Email Status</option>
                        <option value="active">Verified</option>
                        <option value="inactive">Not Verified</option>
                    </select>

                    <select
                        value={subscriptionFilter}
                        onChange={(e) => setSubscriptionFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter] bg-white"
                    >   
                        <option value="">Subscription Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Expired</option>
                    </select>

                    <Button text="Search" onClick={handleSearch} />
                </div>
                
                {(filters.name || filters.emailVerified !== undefined || filters.subscription !== undefined) && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        {filters.name && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Name: {filters.name}
                                <FaTimes 
                                    onClick={() => {
                                        setSearchTerm("");
                                        setFilters(prev => ({ ...prev, name: undefined }));
                                    }}
                                    className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                />
                            </span>
                        )}
                        {filters.emailVerified !== undefined && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Email Verified: {filters.emailVerified ? "Verified" : "Not Verified"}
                                <FaTimes 
                                    onClick={() => {
                                        setEmailFilter("");
                                        setFilters(prev => ({ ...prev, emailVerified: undefined }));
                                    }}
                                    className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                />
                            </span>
                        )}
                        {filters.subscription !== undefined && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Subscription: {filters.subscription ? "Active" : "Expired"}
                                <FaTimes 
                                    onClick={() => {
                                        setSubscriptionFilter("");
                                        setFilters(prev => ({ ...prev, subscription: undefined }));
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
                )}
            </div>

            {/* Results count */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 font-[Inter]">
                    Showing {applicants.length} of {total} applicants
                    {isFetching && !isLoading && <span className="ml-2 text-blue-500">(Updating...)</span>}
                </div>
            </div>
            
            <div className="flex flex-col gap-3">
                {isLoading && applicants.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading applicants...
                    </div>
                ) : applicants.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No applicants found. Click &quot;Add Applicant&quot; to create one.
                    </div>
                ) : (
                    <AnimatePresence>
                        {applicants.map((applicant) => (
                            <ApplicantManagementCard
                                key={applicant.id}
                                applicant={applicant}
                                onDelete={setDeleteConfirm}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>
            
            {hasMore && (
                <div className="flex justify-center">
                    <Button 
                        text={loading ? "Loading..." : "Load More"} 
                        onClick={() => setPage(prev => prev + 1)}
                    />
                </div>
            )}

            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to delete the category <strong>&quot;{deleteConfirm?.name}&quot;</strong>? 
                        This may affect skills that use this category.
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
                            //disabled={deleteMutation.isPending}
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

export default ApplicantManagement;