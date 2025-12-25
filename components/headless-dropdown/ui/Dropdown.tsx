"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check, Folder } from "lucide-react";
import { useDropdown, DropdownItem } from "../hook/useDropdown";
import { icons } from "@/components/reusable-component/Icon";

export interface DropdownProps<T extends DropdownItem> {
    items: T[];
    onChange?: (item: T) => void;
    title?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    searchableFields?: (keyof T)[];
    width?: string;
    showSearch?: boolean;
    showCount?: boolean;
    showIcons?: boolean;
    renderItem?: (item: T, isSelected: boolean) => ReactNode;
    renderSelectedItem?: (item: T) => ReactNode;
    countLabel?: { singular: string; plural: string };
}

export default function Dropdown<T extends DropdownItem>({
    items,
    onChange,
    title,
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    searchableFields = ["name"],
    width = "w-full sm:w-[300px]",
    showSearch = true,
    showCount = true,
    showIcons = true,
    renderItem,
    renderSelectedItem,
    countLabel = { singular: "item", plural: "items" },
}: DropdownProps<T>) {
    const {
        isOpen,
        selectedItem,
        searchTerm,
        filteredItems,
        dropdownRef,
        setSearchTerm,
        handleSelect,
        toggleDropdown,
    } = useDropdown(items, onChange, searchableFields as (keyof T)[]);

    // Default icon renderer
    const getIcon = (iconName?: string) => {
        const Icon = icons[iconName || "Other"] || Folder;
        return <Icon className="w-4 h-4 text-gray-500" />;
    };

    // Default item renderer
    const defaultRenderItem = (item: T, isSelected: boolean) => (
        <div className="flex items-center gap-3 min-w-0">
            {showIcons && <span>{getIcon(item.icon)}</span>}
            <span className={`truncate text-sm ${
                isSelected ? 'text-indigo-700 font-semibold' : 'text-gray-700'
            }`}>
                {item.name}
            </span>
        </div>
    );

    // Default selected item renderer
    const defaultRenderSelectedItem = (item: T) => (
        <div className="flex items-center gap-2.5 min-w-0">
            {showIcons && <span>{getIcon(item.icon)}</span>}
            <span className="truncate text-gray-800 font-medium">
                {item.name}
            </span>
        </div>
    );

    return (
        <div className={width} ref={dropdownRef}>
            {title && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Inter]">
                    {title}
                </label>
            )}
            <div className="relative">
                {/* Custom Dropdown Trigger */}
                <motion.button
                    type="button"
                    onClick={toggleDropdown}
                    whileTap={{ scale: 0.98 }}
                    className={`
                        w-full h-[44px] sm:h-[48px] px-4 py-2
                        bg-gradient-to-r from-white to-slate-50
                        border-2 rounded-xl
                        text-left font-[Inter] text-sm sm:text-base
                        flex items-center justify-between gap-2
                        transition-all duration-300 ease-out
                        shadow-sm hover:shadow-md
                        ${isOpen 
                            ? 'border-indigo-500 ring-4 ring-indigo-500/10 from-indigo-50/50 to-white' 
                            : 'border-gray-200 hover:border-indigo-400'
                        }
                    `}
                >
                    {selectedItem ? (
                        renderSelectedItem ? renderSelectedItem(selectedItem) : defaultRenderSelectedItem(selectedItem)
                    ) : (
                        <span className="text-gray-400 truncate">{placeholder}</span>
                    )}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown className={`w-3 h-3 ${isOpen ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </motion.span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                        >
                            {/* Search Input */}
                            {showSearch && (
                                <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder={searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 
                                                transition-all duration-200 placeholder:text-gray-400"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Options List */}
                            <ul className="max-h-[240px] overflow-y-auto py-1">
                                {filteredItems.length === 0 ? (
                                    <li className="px-4 py-6 text-sm text-gray-400 text-center flex flex-col items-center gap-2">
                                        <span>No {countLabel.plural} found</span>
                                    </li>
                                ) : (
                                    filteredItems.map((item, idx) => {
                                        const isSelected = selectedItem?.id === item.id;

                                        return (
                                            <motion.li
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                                onClick={() => handleSelect(item)}
                                                className={`
                                                    px-4 py-3 cursor-pointer
                                                    flex items-center justify-between gap-3
                                                    transition-all duration-150
                                                    ${isSelected
                                                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500'
                                                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border-l-4 border-transparent'
                                                    }
                                                `}
                                            >
                                                {renderItem ? renderItem(item, isSelected) : defaultRenderItem(item, isSelected)}
                                                {isSelected && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                                                    </motion.span>
                                                )}
                                            </motion.li>
                                        );
                                    })
                                )}
                            </ul>

                            {/* Footer with count */}
                            {showCount && filteredItems.length > 0 && (
                                <div className="px-4 py-2 bg-gradient-to-r from-slate-50 to-gray-50 border-t border-gray-100">
                                    <span className="text-xs text-gray-400 font-[Inter]">
                                        {filteredItems.length} {filteredItems.length === 1 ? countLabel.singular : countLabel.plural} available
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
