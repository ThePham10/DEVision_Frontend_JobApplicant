"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface DropdownItem {
    id: string;
    name: string;
    icon?: string;
    [key: string]: unknown;
}

export interface UseDropdownOptions<T> {
    multiple?: boolean;
    onChange?: (item: T | T[] | null) => void;
    searchableFields?: (keyof T)[];
}

export function useDropdown<T extends DropdownItem>(
    items: T[],
    options: UseDropdownOptions<T> = {}
) {
    const { multiple = false, onChange, searchableFields = ["name"] } = options;
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [selectedItems, setSelectedItems] = useState<T[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Store onChange in a ref to avoid stale closures and prevent effect re-runs
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    });

    // Filter items based on search term
    const filteredItems = items.filter((item) => {
        if (!searchTerm.trim()) return true;
        const lowerSearch = searchTerm.toLowerCase();
        
        return searchableFields.some((field) => {
            const value = item[field];
            if (typeof value === "string") {
                return value.toLowerCase().includes(lowerSearch);
            }
            return false;
        });
    });

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = useCallback(() => {
        setIsOpen((prev) => !prev);
        if (isOpen) {
            setSearchTerm("");
        }
    }, [isOpen]);

    const handleSelect = useCallback((item: T) => {
        if (multiple) {
            // Multi-select mode
            setSelectedItems((prev) => {
                const isAlreadySelected = prev.some((i) => i.id === item.id);
                const newSelection = isAlreadySelected
                    ? prev.filter((i) => i.id !== item.id)
                    : [...prev, item];
                
                // Defer onChange to next tick to avoid updating parent during render
                setTimeout(() => {
                    onChangeRef.current?.(newSelection);
                }, 0);
                
                return newSelection;
            });
            // Don't close dropdown in multi-select mode
        } else {
            // Single-select mode
            setSelectedItem(item);
            setIsOpen(false);
            setSearchTerm("");
            
            // Defer onChange to next tick to avoid updating parent during render
            setTimeout(() => {
                onChangeRef.current?.(item);
            }, 0);
        }
    }, [multiple]);

    const clearSelection = useCallback(() => {
        if (multiple) {
            setSelectedItems([]);
            setTimeout(() => {
                onChangeRef.current?.([]);
            }, 0);
        } else {
            setSelectedItem(null);
            setTimeout(() => {
                onChangeRef.current?.(null);
            }, 0);
        }
    }, [multiple]);

    const isItemSelected = useCallback((item: T) => {
        if (multiple) {
            return selectedItems.some((i) => i.id === item.id);
        }
        return selectedItem?.id === item.id;
    }, [multiple, selectedItem, selectedItems]);

    return {
        isOpen,
        selectedItem,
        selectedItems,
        searchTerm,
        filteredItems,
        dropdownRef,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
        clearSelection,
        setIsOpen,
        isItemSelected,
        multiple,
    };
}
