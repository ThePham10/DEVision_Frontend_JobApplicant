"use client";

import JobPostCard from "./JobPostCard";
import { Modal, Button } from "@/components/reusable-component";
import { AnimatePresence } from "framer-motion";
import useAdminJobPost from "../hook/AdminJobPostHook";
import { JobPostDetailModal } from "./JobPostDetailModal";
import { JobPostFilterBar } from "./JobPostFilterBar"

export function JobPostManagement() {
    const {
        jobPosts,
        isLoading,
        hasNextPage,
        filteredCount,
        selectedJob,
        isDetailModalOpen,
        openDetailModal,
        closeDetailModal,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        isDeleting,
        searchTerm,
        setSearchTerm,
        setEmploymentTypeFilter,
        handleSearch,
        clearFilters,
        handleLoadMore,
        filters,
    } = useAdminJobPost();

    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold font-[Inter] text-gray-900">
                        Job Post Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 font-[Inter]">
                        View and manage job posts from JM team
                    </p>
                </div>
            </div>

            {/* Filters */}
            <JobPostFilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                clearFilters={clearFilters}
                setEmploymentTypeFilter={setEmploymentTypeFilter}
                filters={filters}
            />

            {/* Results count */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 font-[Inter]">
                    Showing {jobPosts.length} of {filteredCount} job posts
                </div>
            </div>

            {/* Job Posts List */}
            <div className="flex flex-col gap-3">
                {isLoading && jobPosts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        Loading job posts...
                    </div>
                ) : jobPosts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-[Inter]">
                        No job posts found.
                    </div>
                ) : (
                    <AnimatePresence>
                        {jobPosts.map((job) => (
                            <JobPostCard
                                key={job.jobId}
                                job={job}
                                onViewDetail={openDetailModal}
                                onDelete={setDeleteConfirm}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Load More */}
            {hasNextPage && (
                <div className="flex justify-center">
                    <Button
                        text={isLoading ? "Loading..." : "Load More"}
                        onClick={handleLoadMore}
                    />
                </div>
            )}

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                title="Job Post Details"
                size="large"
            >
                {selectedJob && (
                    <JobPostDetailModal job={selectedJob} />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="font-[Inter] text-gray-700">
                        Are you sure you want to delete the job post <strong>&quot;{deleteConfirm?.title}&quot;</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-[Inter]"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-[Inter] disabled:opacity-50"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
