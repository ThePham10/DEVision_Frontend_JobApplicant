"use client";

import { useState } from "react";
import { JobPost, JobSearchParams } from "../types";
import { loadJobPosts, deleteJobPost } from "../service/AdminJobPostService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Page size for pagination
const PAGE_SIZE = 10;

/**
 * Admin job post hook
 */
export default function useAdminJobPost() {
    // Query client
    const queryClient = useQueryClient();

    // State for selected job and modal
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // State for delete confirmation
    const [deleteConfirm, setDeleteConfirm] = useState<JobPost | null>(null);

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [employmentTypeFilter, setEmploymentTypeFilter] = useState("");

    // State for pagination
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // State for filters
    const [filters, setFilters] = useState<JobSearchParams>({});

    // Query for job posts
    const {
        data: allJobPosts = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-job-posts", filters],
        queryFn: () => loadJobPosts(filters),
    })

    // Job posts for display
    const jobPosts = allJobPosts.slice(0, visibleCount);
    const hasNextPage = visibleCount < allJobPosts.length;

    // Mutation for delete job post
    const deleteMutation = useMutation({
        mutationFn: deleteJobPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-job-posts"] });
            setDeleteConfirm(null);
        },
    });

    // Load more job posts
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    // Handle search
    const handleSearch = () => {
        setFilters({
            keyword: searchTerm || undefined,
            employmentTypes: employmentTypeFilter ? [employmentTypeFilter] : undefined,
        });
        setVisibleCount(PAGE_SIZE);
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setEmploymentTypeFilter("");
        setFilters({}); 
        setVisibleCount(PAGE_SIZE);
    };

    // Open detail modal
    const openDetailModal = (job: JobPost) => {
        setSelectedJob(job);
        setIsDetailModalOpen(true);
    };

    // Close detail modal
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedJob(null);
    };

    // Handle delete
    const handleDelete = async () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.jobId);
        }
    };

    return {
        jobPosts,
        isLoading,
        error,
        hasNextPage,
        filteredCount: allJobPosts.length,
        selectedJob,
        isDetailModalOpen,
        openDetailModal,
        closeDetailModal,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
        isDeleting: deleteMutation.isPending,
        searchTerm,
        setSearchTerm,
        employmentTypeFilter,
        setEmploymentTypeFilter,
        handleSearch,
        clearFilters,
        handleLoadMore,
        filters, // Committed filters for showing active filters UI
    };
}
