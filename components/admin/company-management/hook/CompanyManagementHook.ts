import { useMemo, useState } from "react";

import { Company, CompanyFilters } from "../types";
import { loadCompaniesMock, activateCompany, deactivateCompany } from "../service/CompanyManagementService";
import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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
        data: companiesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        // companies: indicates the data being queried
        queryKey: ["companies"],
        // first fetch uses page 1
        queryFn: ({ pageParam = 1 }) => {
            return loadCompaniesMock(pageParam, 10);
        },

        // set the starting page for the first query to 1
        initialPageParam: 1,

        // determines the next page to fetch based on the data received from the last fetched page
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    });

    const allCompanies = useMemo(() => 
        companiesData?.pages.flatMap(page => page.data) ?? [], 
        [companiesData]
    );

    const totalCompaniesCount = useMemo(() => 
        companiesData?.pages[0]?.total ?? 0, 
        [companiesData]
    );

    const deactivateMutation = useMutation({
        mutationFn: deactivateCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setIsModalOpen(false);
            setDeactivateConfirm(null);
        }
    });

    const activateMutation = useMutation({
        mutationFn: activateCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setIsModalOpen(false);
            setActivateConfirm(null);
        }
    });

    const handleDeActivate = (company: Company) => {
        deactivateMutation.mutate(company.id);
    }

    const handleActivate = (company: Company) => {
        activateMutation.mutate(company.id);
    }

    const handleLoadMore = () => {
        fetchNextPage();
    }

    return {
        allCompanies,
        totalCompaniesCount,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        handleLoadMore,
        isModalOpen,
        setIsModalOpen,
        deactivateConfirm,
        setDeactivateConfirm,
        handleDeActivate,
        handleActivate,
        activateConfirm,
        setActivateConfirm
    }
}