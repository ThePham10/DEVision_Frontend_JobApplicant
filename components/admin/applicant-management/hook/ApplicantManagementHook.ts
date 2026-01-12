import { useState } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { loadApplicants, deactivateApplicant, activateApplicant } from "../service/ApplicantManagementService";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export default function useApplicantManagement() { 
    // States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deactivateConfirm, setDeactivateConfirm] = useState<ApplicantAccount | null>(null);
    const [activateConfirm, setActivateConfirm] = useState<ApplicantAccount | null>(null);

    // Client-side pagination state
    const PAGE_SIZE = 6; // Number of items to show per "page"
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const queryClient = useQueryClient();

    // Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filters, setFilters] = useState<ApplicantFilters>({});

    // Convert filters
    const buildApiFilters = () => {
        const apiFilters: { id: string; value: string; operator: string }[] = [];

        // Always default filter to include both active and inactive applicants
        apiFilters.push({
            id: "isActive",
            value: "true,false",
            operator: "in"
        });

        // Apply search term filter
        if (searchTerm) {
            apiFilters.push({
                id: 'name',
                value: searchTerm,
                operator: 'contains'
            });
        }

        // Apply status filter
        if (statusFilter) {
            apiFilters.push({
                id: 'isActive',
                value: statusFilter === "active" ? "true" : "false",
                operator: 'equals'
            });
        }

        return apiFilters;
    }

    // Fetch applicants data with filters
    // Refetches when filters change
    const {
        data: applicantsData,
        isLoading,
    } = useQuery({
        queryKey: ["applicantsAdmin", filters],
        queryFn: () => loadApplicants(buildApiFilters()), 
    });

    // All applicants from the server
    const allApplicants = applicantsData?.data ?? [];
    console.log("All Applicants:", allApplicants);
    const totalApplicantsCount = applicantsData?.total ?? 0;

    // Apply client-side lazy loading (pagination)
    // Slice the applicants array to show only the visible count
    const applicants = allApplicants.slice(0, visibleCount);
    // Determine if there are more applicants to load
    const hasNextPage = visibleCount < allApplicants.length;

    // Deactivate applicant 
    // On success, refetches the latest applicants data and updates the query cache
    const deactivateMutation = useMutation({
        mutationFn: deactivateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicantsAdmin"] });
            setIsModalOpen(false);
            setDeactivateConfirm(null);
        }
    });

    // Activate applicant
    // On success, refetches the latest applicants data and updates the query cache
    const activateMutation = useMutation({
        mutationFn: activateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicantsAdmin"] });
            setIsModalOpen(false);
            setActivateConfirm(null);
        }
    });

    // Wrapper deactivate trigger
    const handleDeActivate = () => {
        if (deactivateConfirm) {
            deactivateMutation.mutate(deactivateConfirm.id);
        }
    }

    // Wrapper activate trigger
    const handleActivate = () => {
        if (activateConfirm) {
            activateMutation.mutate(activateConfirm.id);
        }
    }

    // Handle load more for pagination
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    }

    // Handle search
    const handleSearch = () => {
        // Update filters based on search term and status
        const newFilters: ApplicantFilters = {
            name: searchTerm || undefined,
            isActive: statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined,
        };
        setFilters(newFilters);
        setVisibleCount(PAGE_SIZE); // Reset pagination when searching
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("");
        setFilters({});
        setVisibleCount(PAGE_SIZE); // Reset pagination when clearing filters
    };  

    return {
        applicants,
        totalApplicantsCount,
        hasNextPage,
        isLoading,
        handleLoadMore,
        isModalOpen,
        setIsModalOpen,
        deactivateConfirm,
        setDeactivateConfirm,
        handleDeActivate,
        handleActivate,
        activateConfirm,
        setActivateConfirm,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        handleSearch,
        filters,
        clearFilters,
    }
}
