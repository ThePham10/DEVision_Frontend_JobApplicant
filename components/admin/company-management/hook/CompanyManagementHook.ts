import { useMemo, useState } from "react";

import { Company } from "../types";
import { loadCompanies } from "../service/CompanyManagementService";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export default function useCompanyManagement() {
    const [deleteConfirm, setDeleteConfirm] = useState<Company | null>(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // Search/filter state
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: allCompanies = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-companies", searchTerm],
        queryFn: () => loadCompanies(searchTerm),
    });

    const companies = allCompanies.slice(0, visibleCount);
    const hasNextPage = visibleCount < allCompanies.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    };

    const handleSearch = () => {
        setSearchTerm(searchTerm || "");
        setVisibleCount(PAGE_SIZE);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setVisibleCount(PAGE_SIZE);
    };

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
    }
}