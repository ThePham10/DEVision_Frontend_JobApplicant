import { useMemo, useState } from "react";

import { Company, CompanyFilters } from "../types";
import { loadCompanies } from "../service/CompanyManagementService";
import { useInfiniteQuery, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export default function useCompanyManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deactivateConfirm, setDeactivateConfirm] = useState<Company | null>(null);
    const [activateConfirm, setActivateConfirm] = useState<Company | null>(null);

    const queryClient = useQueryClient();

    // Filter state
    // const [searchName, setSearchName] = useState("");
    // const [statusFilter, setStatusFilter] = useState("");
    // const [filters, setFilters] = useState<CompanyFilters>({});

    // use to refetch data when page or filters change
    // cache the data based on page and filters
    const {
        data: allCompanies = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-companies"],
        queryFn: loadCompanies,
    });

    return {
        allCompanies,
    }
}