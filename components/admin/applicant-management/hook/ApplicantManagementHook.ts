import { useState } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { loadApplicants, deactivateApplicant, activateApplicant } from "../service/ApplicantManagementService";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export default function useApplicantManagement() { 

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

        apiFilters.push({
            id: "isActive",
            value: "true,false",
            operator: "in"
        });

        if (searchTerm) {
            apiFilters.push({
                id: 'name',
                value: searchTerm,
                operator: 'contains'
            });
        }

        if (statusFilter) {
            apiFilters.push({
                id: 'isActive',
                value: statusFilter === "active" ? "true" : "false",
                operator: 'equals'
            });
        }

        return apiFilters;
    }

    const {
        data: applicantsData,
        isLoading,
    } = useQuery({
        queryKey: ["applicantsAdmin", filters],
        queryFn: () => loadApplicants(buildApiFilters()), 
    });

    const allApplicants = applicantsData?.data ?? [];
    console.log("All Applicants:", allApplicants);
    const totalApplicantsCount = applicantsData?.total ?? 0;

    // Apply client-side lazy loading (pagination)
    const applicants = allApplicants.slice(0, visibleCount);
    const hasNextPage = visibleCount < allApplicants.length;

    const deactivateMutation = useMutation({
        mutationFn: deactivateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicantsAdmin"] });
            setIsModalOpen(false);
            setDeactivateConfirm(null);
        }
    });

    const activateMutation = useMutation({
        mutationFn: activateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicantsAdmin"] });
            setIsModalOpen(false);
            setActivateConfirm(null);
        }
    });

    const handleDeActivate = () => {
        if (deactivateConfirm) {
            deactivateMutation.mutate(deactivateConfirm.id);
        }
    }

    const handleActivate = () => {
        if (activateConfirm) {
            activateMutation.mutate(activateConfirm.id);
        }
    }

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    }

    // Handle search
    const handleSearch = () => {
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
