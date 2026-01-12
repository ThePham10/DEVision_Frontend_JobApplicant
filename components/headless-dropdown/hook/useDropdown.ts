"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// Define the type of the drop down item
export interface DropdownItem {
    id: string;
    name: string;
    icon?: string;
    [key: string]: unknown;
}

// Define the type of the drop down option
export interface UseDropdownOptions<T> {
    multiple?: boolean;
    onChange?: (item: T | T[] | null) => void;
    searchableFields?: (keyof T)[];
    defaultValue?: string; // ID of default selected item (single select)
    defaultValues?: string[]; // IDs of default selected items (multi select)
}

/**
 * Drop down hook for handling dropdown functionality
 * @param items - Array of items to be displayed in the drop down
 * @param options - Options for the drop down
 */
export function useDropdown<T extends DropdownItem>(
    items: T[],
    options: UseDropdownOptions<T> = {}
) {
    // Destructure the options
    const {
        multiple = false,
        onChange,
        searchableFields = ["name"],
        defaultValue,
        defaultValues = []
    } = options;

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [selectedItems, setSelectedItems] = useState<T[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Drop down reference
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize selection from default values when items load
    useEffect(() => {
        if (multiple && defaultValues.length > 0 && items.length > 0) {
            setSelectedItems(prev => {
                if (prev.length > 0) return prev;
                return items.filter(item => defaultValues.includes(item.id));
            });
        } else if (!multiple && defaultValue && items.length > 0) {
            setSelectedItem(prev => {
                if (prev !== null) return prev;
                return items.find(item => item.id === defaultValue) || null;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

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

    // Handle toggle the drop down
    const toggleDropdown = useCallback(() => {
        setIsOpen((prev) => !prev);
        if (isOpen) {
            setSearchTerm("");
        }
    }, [isOpen]);

    // Handle the selection
    const handleSelect = useCallback((item: T) => {
        if (multiple) {
            // Multi-select mode
            setSelectedItems((prev) => {
                // Check whether is current selection has already selected
                const isAlreadySelected = prev.some((i) => i.id === item.id);

                // If already selected, remove it, otherwise add it
                const newSelection = isAlreadySelected
                    ? prev.filter((i) => i.id !== item.id)
                    : [...prev, item];

                // Defer onChange to next tick to avoid updating parent during render
                setTimeout(() => {
                    onChangeRef.current?.(newSelection);
                }, 0);

                return newSelection;
            });
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

    // Handle clear all selection
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

    // Check whether an item is selected
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
