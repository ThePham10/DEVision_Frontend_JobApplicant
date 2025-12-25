"use client";

import { useEffect, useState } from "react";
import { ApplicantFilters, ApplicantAccount } from "../types";
import { loadApplicants } from "../service/ApplicantManagementService";

const useApplicantManagement = () => {
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [subscriptionFilter, setSubscriptionFilter] = useState("");
    const [filters, setFilters] = useState<ApplicantFilters>({});

    const [applicants, setApplicants] = useState<ApplicantAccount[]>([]);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [deleteConfirm, setDeleteConfirm] = useState<ApplicantAccount | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const loading = isLoading || isFetching;

    const handleDelete = async () => {
        if (deleteConfirm) {
            setIsLoading(true);
            
            try {
                setApplicants(
                    prev => prev.filter(
                        applicant => applicant.id !== deleteConfirm.id
                    )
                );
                setTotal(prev => prev - 1);
                setDeleteConfirm(null);
            } catch (err) {
                console.error("Failed to delete applicant:", err);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const fetchApplicants = async () => {
        setIsLoading(true);
        setIsFetching(true);
        
        try {
            const response = await loadApplicants(page, 10, filters);
            setApplicants(response.data);
            setTotal(response.total);
            setHasMore(response.hasMore);
        } catch (err) {
            console.error("Failed to load applicants:", err);
        } finally {
            setIsFetching(false);
            setIsLoading(false);
        }
    };

    // Fetch data whenever page or filters change
    useEffect(() => {
        fetchApplicants();

    }, [page, filters]);

    const handleSearch = () => {
        setPage(1); // Reset to first page when searching
        setFilters({
            name: searchName || undefined,
            email: searchEmail || undefined,
            emailVerified: emailFilter === "" ? undefined : emailFilter === "active",
            subscription: subscriptionFilter === "" ? undefined : subscriptionFilter === "active",
        });
    };
    
    const clearFilters = () => {
        setFilters({});
        setSearchName("");
        setSearchEmail("");
        setEmailFilter("");
        setSubscriptionFilter("");
        setPage(1);
    };

    return {
        applicants,
        total,
        hasMore,
        loading,
        filters, setFilters,
        isLoading,
        isFetching,
        deleteConfirm, setDeleteConfirm,
        handleDelete,
        handleSearch,
        clearFilters,
        page,
        setPage,
        searchName,
        setSearchName,
        searchEmail,
        setSearchEmail,
        emailFilter,
        setEmailFilter,
        subscriptionFilter,
        setSubscriptionFilter,
    };
}

export default useApplicantManagement;