import { useMemo, useState } from "react";

import { Company } from "../types";
import { deleteCompanyById, loadCompanies } from "../service/CompanyManagementService";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

// Number of items to load per "page"
const PAGE_SIZE = 5;

export default function useCompanyManagement() {
    // States
    const [deleteConfirm, setDeleteConfirm] = useState<Company | null>(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const queryClient = useQueryClient();

    // Search/filter state
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch companies data with search term
    // Refetches when search term changes
    const {
        data: allCompanies = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-companies", searchTerm],
        queryFn: () => loadCompanies(searchTerm),
    });

    // Paginate companies for client-side pagination
    // Slices the fetched data based on visible count
    const companies = allCompanies.slice(0, visibleCount);
    // Determine if there are more companies to load
    const hasNextPage = visibleCount < allCompanies.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    // Handle search action
    const handleSearch = () => {
        setSearchTerm(searchTerm || "");
        setVisibleCount(PAGE_SIZE);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setVisibleCount(PAGE_SIZE);
    };

    // Delete a company by ID
    // On success, invalidates the companies query to refetch updated data
    const deleteMutation = useMutation({
        mutationFn: deleteCompanyById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-companies"] });
            setDeleteConfirm(null);
        },
    })
    
    // Wrapper delete trigger
    const handleDelete = () => {
        if (deleteConfirm) {
            deleteMutation.mutate(deleteConfirm.userId);
        }
    }

    return {
        companies,
        allCompaniesCount: allCompanies.length,
        searchTerm,
        setSearchTerm,
        isLoading,
        error,
        hasNextPage,
        handleLoadMore,
        handleSearch,
        clearFilters,
        deleteConfirm,
        setDeleteConfirm,
        handleDelete,
    }
}