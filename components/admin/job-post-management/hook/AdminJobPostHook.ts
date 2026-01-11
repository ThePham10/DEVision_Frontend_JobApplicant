"use client";

import { useState } from "react";
import { JobPost, JobSearchParams } from "../types";
import { loadJobPosts, deleteJobPost } from "../service/AdminJobPostService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 10;

export default function useAdminJobPost() {
    const queryClient = useQueryClient();

    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [deleteConfirm, setDeleteConfirm] = useState<JobPost | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [employmentTypeFilter, setEmploymentTypeFilter] = useState("");

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const [filters, setFilters] = useState<JobSearchParams>({});


    const {
        data: allJobPosts = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-job-posts", filters],
        queryFn: () => loadJobPosts(filters), // Use filters directly (set on button click)
    })


    const jobPosts = allJobPosts.slice(0, visibleCount);
    const hasNextPage = visibleCount < allJobPosts.length;


    const deleteMutation = useMutation({
        mutationFn: deleteJobPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-job-posts"] });
            setDeleteConfirm(null);
        },
    });

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    const handleSearch = () => {
        setFilters({
            keyword: searchTerm || undefined,
            employmentTypes: employmentTypeFilter ? [employmentTypeFilter] : undefined,
        });
        setVisibleCount(PAGE_SIZE);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setEmploymentTypeFilter("");
        setFilters({}); // Clear committed filters to refetch all job posts
        setVisibleCount(PAGE_SIZE);
    };

    const openDetailModal = (job: JobPost) => {
        setSelectedJob(job);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedJob(null);
    };

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
