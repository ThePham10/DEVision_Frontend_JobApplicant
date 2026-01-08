"use client";

import { useState } from "react";
import { JobPost } from "../types";
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
    const [statusFilter, setStatusFilter] = useState("");

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const {
        data: allJobPosts = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-job-posts"],
        queryFn: loadJobPosts,
    });

    const filteredJobPosts = allJobPosts.filter(job => {
        if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        if (employmentTypeFilter && job.employmentType !== employmentTypeFilter) {
            return false;
        }

        if (statusFilter && job.status !== statusFilter) {
            return false;
        }
        return true;
    });

    const jobPosts = filteredJobPosts.slice(0, visibleCount);
    const hasNextPage = visibleCount < filteredJobPosts.length;


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
        setVisibleCount(PAGE_SIZE);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setEmploymentTypeFilter("");
        setStatusFilter("");
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
        filteredCount: filteredJobPosts.length,
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
        statusFilter,
        setStatusFilter,
        handleSearch,
        clearFilters,
        handleLoadMore,
    };
}
