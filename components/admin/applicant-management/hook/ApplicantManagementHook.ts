import { useState, useMemo } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { loadApplicants, deactivateApplicant, activateApplicant } from "../service/ApplicantManagementService";
import { useInfiniteQuery, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export default function useApplicantManagement() { 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deactivateConfirm, setDeactivateConfirm] = useState<ApplicantAccount | null>(null);
    const [activateConfirm, setActivateConfirm] = useState<ApplicantAccount | null>(null);

    // Client-side pagination state
    const PAGE_SIZE = 6; // Number of items to show per "page"
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const queryClient = useQueryClient();

    // Filter state
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filters, setFilters] = useState<ApplicantFilters>({});

    // // use to refetch data when page or filters change
    // // cache the data based on page and filters
    // const {
    //     data: applicantsData,
    //     fetchNextPage,
    //     hasNextPage,
    //     isFetchingNextPage,
    //     isLoading,
    // } = useInfiniteQuery({
    //     // applicants: indicates the data being queried
    //     queryKey: ["applicants"],
    //     // first fetch uses page 1
    //     queryFn: ({ pageParam = 1 }) => {
    //         return loadApplicants(pageParam, 10);
    //     },

    //     // set the starting page for the first query to 1
    //     initialPageParam: 1,

    //     // determines the next page to fetch based on the data received from the last fetched page
    //     getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    // });

    // Load ALL applicants at once (use a high limit)
    const {
        data: applicantsData,
        isLoading,
    } = useQuery({
        queryKey: ["applicants"],
        queryFn: () => loadApplicants(1, 100), // Load all applicants with high limit
    });

    const allApplicants = applicantsData?.data ?? [];
    console.log("All Applicants:", allApplicants);
    const totalApplicantsCount = applicantsData?.total ?? 0;
    
    // Apply client-side filters
    const filteredApplicants = allApplicants.filter(applicant => {
        // Filter by name
        if (filters.name && !applicant.name.toLowerCase().includes(filters.name.toLowerCase())) {
            return false;
        }
        // Filter by phone
        if (filters.phone && (!applicant.phone || !applicant.phone.toLowerCase().includes(filters.phone.toLowerCase()))) {
            return false;
        }
        // Filter by email
        if (filters.email && !applicant.email.toLowerCase().includes(filters.email.toLowerCase())) {
            return false;
        }
        // Filter by status
        if (filters.isActive !== undefined && applicant.isActive !== filters.isActive) {
            return false;
        }
        return true;
    });

    // Apply client-side lazy loading (pagination)
    const applicants = filteredApplicants.slice(0, visibleCount);
    const hasNextPage = visibleCount < filteredApplicants.length;


    const deactivateMutation = useMutation({
        mutationFn: deactivateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicants"] });
            setIsModalOpen(false);
            setDeactivateConfirm(null);
        }
    });

    const activateMutation = useMutation({
        mutationFn: activateApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applicants"] });
            setIsModalOpen(false);
            setActivateConfirm(null);
        }
    });

    const handleDeActivate = (applicant: ApplicantAccount) => {
        deactivateMutation.mutate(applicant.id);
    }

    const handleActivate = (applicant: ApplicantAccount) => {
        activateMutation.mutate(applicant.id);
    }

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    }

    // Handle search
    const handleSearch = () => {
        const newFilters: ApplicantFilters = {
            name: searchName || undefined,
            phone: searchPhone || undefined,
            email: searchEmail || undefined,
            isActive: statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined,
        };
        setFilters(newFilters);
        setVisibleCount(PAGE_SIZE); // Reset pagination when searching
    };

    // Clear filters
    const clearFilters = () => {
        setSearchName("");
        setSearchPhone("");
        setSearchEmail("");
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
        // Search & filter
        searchName,
        setSearchName,
        searchPhone,
        setSearchPhone,
        searchEmail,
        setSearchEmail,
        statusFilter,
        setStatusFilter,
        handleSearch,
        filters,
        clearFilters,
    }
}
