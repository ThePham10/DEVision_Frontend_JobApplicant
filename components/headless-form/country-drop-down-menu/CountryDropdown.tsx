"use client";

import { useCountryDropdown, Country } from "./hook/useCountryDropdown";

type CountryDropdownProps = {
    title: string;
    onChange?: (country: Country) => void;
    errorMessage?: string;
};

export default function CountryDropdown({ title, onChange, errorMessage }: CountryDropdownProps) {
    const {
        loading,
        isOpen,
        selectedCountry,
        searchTerm,
        filteredCountries,
        dropdownRef,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
    } = useCountryDropdown(onChange);

    return (
        <div className="mb-4" ref={dropdownRef}>
            <label className="block font-[Inter] text-[#0F1729] mb-2">
                {title}
            </label>
            <div className="relative">
                {/* Custom Dropdown Trigger */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={loading}
                    className={`
                        w-full h-[40px] px-3 py-2
                        bg-white border border-[#E1E7EF] rounded
                        text-left font-[Inter] text-gray-700
                        flex items-center justify-between
                        transition-all duration-200 ease-in-out
                        hover:border-[#6366F1] hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]
                        ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        ${isOpen ? 'border-[#6366F1] ring-2 ring-[#6366F1]/20' : ''}
                    `}
                >
                    <span className={`truncate ${!selectedCountry ? 'text-gray-400' : 'text-[#0F1729]'}`}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-[#6366F1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading countries...
                            </span>
                        ) : selectedCountry ? selectedCountry.label : "Select a country"}
                    </span>
                    <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && !loading && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E1E7EF] rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Search Input */}
                        <div className="p-2 border-b border-[#E1E7EF] bg-gradient-to-r from-[#F8FAFC] to-[#F1F5F9]">
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search countries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1E7EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-200"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <ul className="max-h-[200px] overflow-y-auto">
                            {filteredCountries.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No countries found
                                </li>
                            ) : (
                                filteredCountries.map((country, idx) => (
                                    <li
                                        key={country.value}
                                        onClick={() => handleSelect(country)}
                                        className={`
                                            px-4 py-2.5 text-sm cursor-pointer
                                            flex items-center gap-3
                                            transition-all duration-150
                                            ${selectedCountry?.value === country.value
                                                ? 'bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 text-[#6366F1] font-medium'
                                                : 'text-[#0F1729] hover:bg-gradient-to-r hover:from-[#F8FAFC] hover:to-[#F1F5F9]'
                                            }
                                            ${idx !== filteredCountries.length - 1 ? 'border-b border-[#F1F5F9]' : ''}
                                        `}
                                    >
                                        <span className="text-sm">
                                            {country.value}
                                        </span>
                                        <span className="truncate">{country.label}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
                {errorMessage && (
                <p className={`mt-1 text-sm border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-500`}>
                    {errorMessage}
                </p>
            )}
            </div>
        </div>
    );
}
