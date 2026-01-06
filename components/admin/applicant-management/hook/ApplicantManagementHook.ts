import { useState, useMemo } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { loadApplicants, deactivateApplicant, activateApplicant } from "../service/ApplicantManagementService";
import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function useApplicantManagement() { 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deactivateConfirm, setDeactivateConfirm] = useState<ApplicantAccount | null>(null);
    const [activateConfirm, setActivateConfirm] = useState<ApplicantAccount | null>(null);

    const queryClient = useQueryClient();

    // Filter state
    // const [searchName, setSearchName] = useState("");
    // const [statusFilter, setStatusFilter] = useState("");
    // const [filters, setFilters] = useState<ApplicantFilters>({});

    // use to refetch data when page or filters change
    // cache the data based on page and filters
    const {
        data: applicantsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        // applicants: indicates the data being queried
        queryKey: ["applicants"],
        // first fetch uses page 1
        queryFn: ({ pageParam = 1 }) => {
            return loadApplicants(pageParam, 10);
        },

        // set the starting page for the first query to 1
        initialPageParam: 1,

        // determines the next page to fetch based on the data received from the last fetched page
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    });

    const allApplicants = useMemo(() => 
        applicantsData?.pages.flatMap(page => page.data) ?? [], 
        [applicantsData]
    );

    const totalApplicantsCount = useMemo(() => 
        applicantsData?.pages[0]?.total ?? 0, 
        [applicantsData]
    );

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
        fetchNextPage();
    }

    return {
        allApplicants,
        totalApplicantsCount,
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
