"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface DropdownItem {
    id: string;
    name: string;
    icon?: string;
    [key: string]: unknown; // Allow additional properties
}

export function useDropdown<T extends DropdownItem>(
    items: T[],
    onChange?: (item: T) => void,
    searchableFields: (keyof T)[] = ["label"]
) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        setSelectedItem(item);
        setIsOpen(false);
        setSearchTerm("");
        onChange?.(item);
    }, [onChange]);

    const clearSelection = useCallback(() => {
        setSelectedItem(null);
        onChange?.(null as unknown as T);
    }, [onChange]);

    return {
        isOpen,
        selectedItem,
        searchTerm,
        filteredItems,
        dropdownRef,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
        clearSelection,
        setIsOpen,
    };
}
