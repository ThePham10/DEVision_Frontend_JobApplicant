import { Search, X } from "lucide-react";
import Dropdown from "@/components/headless-dropdown";
import { Button } from "@/components/reusable-component";
import { employmentTypes, statusOptions } from "../types";

interface JobPostFilterBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    handleSearch: () => void;
    clearFilters: () => void;
    setEmploymentTypeFilter: (employmentType: string) => void;
    setStatusFilter: (status: string) => void;
}

export const JobPostFilterBar = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    clearFilters,
    setEmploymentTypeFilter,
    setStatusFilter,
} : JobPostFilterBarProps ) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-[Inter] text-base sm:text-lg font-semibold mb-3 sm:mb-4">Search Job Posts</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search by job title..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[Inter]"
                    />
                </div>

                <Dropdown
                    items={employmentTypes}
                    onChange={(value) => {
                        if (value && !Array.isArray(value)) {
                            setEmploymentTypeFilter(value.id);
                        }
                    }}
                    placeholder="Employment Type"
                />

                <Dropdown
                    items={statusOptions}
                    onChange={(value) => {
                        if (value && !Array.isArray(value)) {
                            setStatusFilter(value.id);
                        }
                    }}
                    placeholder="Status"
                />

                <Button text="Search" onClick={handleSearch} style="w-full sm:w-auto" />
            </div>

            {/* Active Filters */}
            {searchTerm && (
                <div className="flex flex-wrap gap-2 mt-4 items-center">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Search: {searchTerm}
                        <X
                            onClick={() => {
                                setSearchTerm("");
                                handleSearch();
                            }}
                            className="cursor-pointer ml-1 hover:bg-blue-200 rounded-full p-0.5 w-4 h-4"
                        />
                    </span>
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    )
}