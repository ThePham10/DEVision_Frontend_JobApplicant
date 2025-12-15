// Custom hook for managing country dropdown state and logic

import { useEffect, useState, useRef, RefObject } from "react";
import { fetchCountries, Country } from "../api/countryDropDownMenuService";

export type { Country };

type UseCountryDropdownReturn = {
    // State
    countries: Country[];
    loading: boolean;
    isOpen: boolean;
    selectedCountry: Country | null;
    searchTerm: string;
    filteredCountries: Country[];
    dropdownRef: RefObject<HTMLDivElement | null>;
    
    // Actions
    setIsOpen: (open: boolean) => void;
    setSearchTerm: (term: string) => void;
    handleSelect: (country: Country) => void;
    toggleDropdown: () => void;
};

export function useCountryDropdown(
    onChange?: (country: Country) => void
): UseCountryDropdownReturn {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch countries on mount
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCountries();
    }, []);

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

    // Filter countries based on search term
    const filteredCountries = countries.filter(country =>
        country.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle country selection
    const handleSelect = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchTerm("");
        onChange?.(country);
    };

    // Toggle dropdown open/closed
    const toggleDropdown = () => {
        if (!loading) {
            setIsOpen(!isOpen);
        }
    };

    return {
        countries,
        loading,
        isOpen,
        selectedCountry,
        searchTerm,
        filteredCountries,
        dropdownRef,
        setIsOpen,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
    };
}
