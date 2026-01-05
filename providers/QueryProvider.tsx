"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryProviderProps {
    children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    // Create a new QueryClient instance for each session
    // Using useState ensures the client is only created once per component lifecycle
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data is considered fresh for 5 minutes
                        staleTime: 5 * 60 * 1000,
                        // Cache data for 10 minutes
                        gcTime: 10 * 60 * 1000,
                        // Retry failed requests once
                        retry: 1,
                        // Don't refetch on window focus for admin panel
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
