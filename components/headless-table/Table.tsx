"use client";

import useTable, { PaginatedResponse } from "./hook/useTable"
import Button from "@/components/reusable-component/Button"

interface TableProps<T, F> {
    /** CSS class for the container */
    className?: string
    /** Header title */
    title?: string
    /** Component to render each item */
    CardComponent: React.FC<{ item: T }>
    /** Service function to fetch items (receives page, limit, filters) */
    loadItemService: (page: number, limit: number, filters?: F) => Promise<PaginatedResponse<T>>
    /** Items per page (default: 10) */
    limit?: number
    /** Current filters to apply */
    filters?: F
    /** Callback when filters change internally */
    onFiltersChange?: (filters: F) => void
    /** Custom loading component */
    LoadingComponent?: React.FC
    /** Custom error component */
    ErrorComponent?: React.FC<{ error: string; retry: () => void }>
    /** Custom empty state component */
    EmptyComponent?: React.FC
    /** ID extractor for better keys (defaults to index) */
    getItemId?: (item: T) => string | number
    /** Show total count */
    showTotal?: boolean

}

// Default components
const DefaultLoading = () => <div className="table-loading">Loading...</div>
const DefaultError = ({ error, retry }: { error: string; retry: () => void }) => (
    <div className="table-error">
        <p>Error: {error}</p>
        <button onClick={retry}>Retry</button>
    </div>
)
const DefaultEmpty = () => <div className="table-empty">No items found</div>

const Table = <T extends object, F extends object = Record<string, unknown>>({
    className,
    title,
    CardComponent,
    loadItemService,
    limit = 10,
    filters: externalFilters,
    LoadingComponent = DefaultLoading,
    ErrorComponent = DefaultError,
    EmptyComponent = DefaultEmpty,
    getItemId,
    showTotal = false,
}: TableProps<T, F>) => {
    const { 
        items, 
        loading, 
        loadingMore, 
        error, 
        hasMore, 
        total,
        loadMore, 
        refetch,
        setFilters 
    } = useTable<T, F>(
        loadItemService,
        { limit, initialFilters: externalFilters }
    )

    // Sync external filters with internal state
    // When parent component changes filters, update internal state
    if (externalFilters && JSON.stringify(externalFilters) !== JSON.stringify(undefined)) {
        // This will be handled by useEffect in useTable
    }

    // Loading state
    if (loading) {
        return <LoadingComponent />
    }

    // Error state
    if (error) {
        return <ErrorComponent error={error} retry={refetch} />
    }

    // Empty state
    if (items.length === 0) {
        return <EmptyComponent />
    }

    return (
        <div className={className}>
            {showTotal && total !== null && (
                <div className="flex justify-between">
                    <div className="text-2xl font-bold">
                        {title}
                    </div>
                    <div className="text-sm text-gray-500">
                        Showing {items.length} of {total} results
                    </div>
                </div>
            )}
            {items.map((item, index) => (
                <CardComponent 
                    key={getItemId ? getItemId(item) : index} 
                    item={item} 
                />
            ))}
            {hasMore && (
                <Button text={loadingMore ? "Loading..." : "Load More"} onClick={loadMore} />
            )}
        </div>
    )
}

export default Table