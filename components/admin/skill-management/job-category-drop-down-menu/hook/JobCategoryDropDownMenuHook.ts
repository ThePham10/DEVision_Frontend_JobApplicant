import { useEffect, useState, useRef, RefObject } from "react"
import { JobCategory } from "../../types";

type UseJobCategoryDropdownReturn = {
    // State
    jobCategories: JobCategory[];
    isOpen: boolean;
    selectedJobCategory: JobCategory | null;
    searchTerm: string;
    filteredJobCategories: JobCategory[];
    dropdownRef: RefObject<HTMLDivElement | null>;
    
    // Actions
    setIsOpen: (open: boolean) => void;
    setSearchTerm: (term: string) => void;
    handleSelect: (jobCategory: JobCategory) => void;
    toggleDropdown: () => void;
};

export function useJobCategoryDropdown(
    jobCategories: JobCategory[],
    onChange?: (jobCategory: JobCategory) => void
): UseJobCategoryDropdownReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedJobCategory, setSelectedJobCategory] = useState<JobCategory | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
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

    // Filter jobCategory based on search term
    const filteredJobCategories = jobCategories.filter(jobCategory =>
        jobCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle jobCategory selection
    const handleSelect = (jobCategory: JobCategory) => {
        setSelectedJobCategory(jobCategory);
        setIsOpen(false);
        setSearchTerm("");
        onChange?.(jobCategory);
    };

    // Toggle dropdown open/closed
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return {
        jobCategories,
        isOpen,
        selectedJobCategory,
        searchTerm,
        filteredJobCategories,
        dropdownRef,
        setIsOpen,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
    };
}
