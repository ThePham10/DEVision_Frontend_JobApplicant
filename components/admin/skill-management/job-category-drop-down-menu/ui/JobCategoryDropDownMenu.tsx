"use client";

import { useJobCategoryDropdown } from "../hook/JobCategoryDropDownMenuHook";
import { JobCategory } from "../../types";

type JobCategoryDropdownProps = {
    onChange?: (jobCategory: JobCategory) => void;
    jobCategories: JobCategory[];
};

export default function JobCategoryDropDownMenu({ onChange, jobCategories}: JobCategoryDropdownProps) {
    const {
        isOpen,
        selectedJobCategory,
        searchTerm,
        filteredJobCategories,
        dropdownRef,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
    } = useJobCategoryDropdown(jobCategories, onChange);

    return (
        <div className="w-[300px] mb-4" ref={dropdownRef}>
            <div className="relative">
                {/* Custom Dropdown Trigger */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`
                        w-full h-[40px] px-3 py-2
                        bg-white border border-[#E1E7EF] rounded
                        text-left font-[Inter] text-gray-700
                        flex items-center justify-between
                        transition-all duration-200 ease-in-out
                        hover:border-[#6366F1] hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]
                        ${isOpen ? 'border-[#6366F1] ring-2 ring-[#6366F1]/20' : ''}
                    `}
                >
                    <span className={`truncate ${!selectedJobCategory ? 'text-gray-400' : 'text-[#0F1729]'}`}>
                        {selectedJobCategory ? selectedJobCategory.name : "Select a category"}
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
                {isOpen && (
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
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E1E7EF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-200"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <ul className="max-h-[200px] overflow-y-auto">
                            {filteredJobCategories.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No countries found
                                </li>
                            ) : (
                                filteredJobCategories.map((jobCategory, idx) => (
                                    <li
                                        key={jobCategory.id}
                                        onClick={() => handleSelect(jobCategory)}
                                        className={`
                                            px-4 py-2.5 text-sm cursor-pointer
                                            flex items-center gap-3
                                            transition-all duration-150
                                            ${selectedJobCategory?.id === jobCategory.id
                                                ? 'bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 text-[#6366F1] font-medium'
                                                : 'text-[#0F1729] hover:bg-gradient-to-r hover:from-[#F8FAFC] hover:to-[#F1F5F9]'
                                            }
                                            ${idx !== filteredJobCategories.length - 1 ? 'border-b border-[#F1F5F9]' : ''}
                                        `}
                                    >
                                        <span className="truncate">{jobCategory.name}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
