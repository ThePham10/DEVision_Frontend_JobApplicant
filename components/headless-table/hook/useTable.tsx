import { useCallback, useEffect, useState } from "react"

interface UseTableOptions<F> {
    /** Items per page (default: 10) */
    limit?: number
    /** Initial filters */
    initialFilters?: F
}

interface UseTableResult<T, F> {
    /** All loaded items */
    items: T[]
    /** True during initial load */
    loading: boolean
    /** True while loading more items */
    loadingMore: boolean
    /** Error message if fetch failed */
    error: string | null
    /** True if more items available */
    hasMore: boolean
    /** Total count of items (if available from API) */
    total: number | null
    /** Current filters */
    filters: F | undefined
    /** Load next page of items */
    loadMore: () => Promise<void>
    /** Reset and reload from page 1 */
    refetch: () => Promise<void>
    /** Update filters and reload data */
    setFilters: (newFilters: F) => void
    /** Clear all filters */
    clearFilters: () => void
}

interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

/**
 * Headless table hook with server-side lazy loading and filtering
 * @param loadItemService - Fetches items from server (receives page, limit, filters)
 * @param options - Configuration options
 */
const useTable = <T = unknown, F = Record<string, unknown>>(
    loadItemService: (page: number, limit: number, filters?: F) => Promise<PaginatedResponse<T>>,
    options: UseTableOptions<F> = {}
): UseTableResult<T, F> => {
    const { limit = 10, initialFilters } = options

    const [items, setItems] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [total, setTotal] = useState<number | null>(null)
    const [filters, setFiltersState] = useState<F | undefined>(initialFilters)

    // Fetch items for a specific page
    const fetchPage = useCallback(async (pageNum: number, append: boolean, currentFilters?: F) => {
        try {
            const response = await loadItemService(pageNum, limit, currentFilters)
            
            if (append) {
                setItems(prev => [...prev, ...response.data])
            } else {
                setItems(response.data)
            }
            
            setTotal(response.total)
            setHasMore(response.hasMore)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load')
        }
    }, [loadItemService, limit])

    // Initial load
    useEffect(() => {
        const initialFetch = async () => {
            setLoading(true)
            await fetchPage(1, false, filters)
            setLoading(false)
        }
        initialFetch()
    }, [fetchPage, filters])

    // Load more items
    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return
        
        setLoadingMore(true)
        const nextPage = page + 1
        await fetchPage(nextPage, true, filters)
        setPage(nextPage)
        setLoadingMore(false)
    }, [loadingMore, hasMore, page, fetchPage, filters])

    // Reset and refetch
    const refetch = useCallback(async () => {
        setPage(1)
        setHasMore(true)
        setLoading(true)
        setError(null)
        await fetchPage(1, false, filters)
        setLoading(false)
    }, [fetchPage, filters])

    // Update filters (this triggers useEffect to refetch)
    const setFilters = useCallback((newFilters: F) => {
        setPage(1)  // Reset to first page when filters change
        setFiltersState(newFilters)
    }, [])

    // Clear all filters
    const clearFilters = useCallback(() => {
        setPage(1)
        setFiltersState(undefined)
    }, [])

    return { 
        items, 
        loading, 
        loadingMore, 
        error, 
        hasMore, 
        total,
        filters,
        loadMore, 
        refetch,
        setFilters,
        clearFilters
    }
}

export default useTable
export type { PaginatedResponse, UseTableOptions, UseTableResult }