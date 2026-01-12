"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check, Folder, X } from "lucide-react";
import { useDropdown, DropdownItem } from "../hook/useDropdown";
import { icons } from "@/components/reusable-component";

// Define the drop down props
export interface DropdownProps<T extends DropdownItem> {
    items: T[];
    onChange?: (item: T | T[] | null) => void;
    title?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    searchableFields?: (keyof T)[];
    width?: string;
    showSearch?: boolean;
    showCount?: boolean;
    showIcons?: boolean;
    multiple?: boolean;
    renderItem?: (item: T, isSelected: boolean) => ReactNode;
    renderSelectedItem?: (item: T) => ReactNode;
    countLabel?: { singular: string; plural: string };
    defaultValue?: string; // ID of default selected item (single select)
    defaultValues?: string[]; // IDs of default selected items (multi select)
}

/**
 * The headless drop down menu
 * @param items - Array of items to be displayed in the drop down
 * @param onChange - Callback function to be called when the selection changes 
 * @param placeholder - Placeholder text to be displayed when no item is selected
 * @param searchPlaceholder - Placeholder text to be displayed in the search input
 * @param searchableFields - Array of fields to be searched
 * @param width - Width of the drop down
 * @param showSearch - Whether to show the search input
 * @param showCount - Whether to show the count of selected items
 * @param showIcons - Whether to show icons for each item
 * @param multiple - Whether to allow multiple selection
 * @param renderItem - Function to render each item
 * @param renderSelectedItem - Function to render the selected item
 * @param countLabel - Label to be displayed when multiple items are selected
 * @param defaultValue - Default value of the drop down
 * @param defaultValues - Array of default values of the drop down
 * @returns 
 */
export default function Dropdown<T extends DropdownItem>({
    items,
    onChange,
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    searchableFields = ["name"],
    width = "w-full sm:w-[300px]",
    showSearch = true,
    showCount = true,
    showIcons = true,
    multiple = false,
    renderItem,
    renderSelectedItem,
    countLabel = { singular: "item", plural: "items" },
    defaultValue,
    defaultValues = [],
}: DropdownProps<T>) {
    const {
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
        isItemSelected,
    } = useDropdown(items, { 
        multiple, 
        onChange, 
        searchableFields: searchableFields as (keyof T)[],
        defaultValue,
        defaultValues,
    });

    // Default icon renderer
    const getIcon = (iconName?: string) => {
        const Icon = icons[iconName || "Other"] || Folder;
        return <Icon className="w-4 h-4 text-gray-500" />;
    };

    // Default item renderer for list
    const defaultRenderItem = (item: T, isSelected: boolean) => (
        <div className="flex items-center gap-3 min-w-0 flex-1">
            {showIcons && <span className="flex-shrink-0">{getIcon(item.icon)}</span>}
            <span className={`truncate text-sm ${
                isSelected ? 'text-indigo-700 font-medium' : 'text-gray-700'
            }`}>
                {item.name}
            </span>
        </div>
    );

    // Default selected item renderer (single select)
    const defaultRenderSelectedItem = (item: T) => (
        <div className="flex items-center gap-2.5 min-w-0">
            {showIcons && <span>{getIcon(item.icon)}</span>}
            <span className="truncate text-gray-800 font-medium">
                {item.name}
            </span>
        </div>
    );

    // Remove a single tag in multi-select
    const removeTag = (e: React.MouseEvent, item: T) => {
        e.stopPropagation();
        handleSelect(item); // Toggle off
    };

    // Render the trigger content based on selection state
    const renderTriggerContent = () => {
        if (multiple) {
            // Multi-select mode
            if (selectedItems.length === 0) {
                return (
                    <div className="flex items-center gap-2 text-gray-400">
                        <Search className="w-4 h-4" />
                        <span className="truncate">{placeholder}</span>
                    </div>
                );
            }
            
            return (
                <div className="flex items-center gap-2 min-w-0 flex-1 py-0.5">
                    {/* Tags container */}
                    <div className="flex flex-wrap gap-1.5 flex-1">
                        {selectedItems.slice(0, 2).map((item) => (
                            <span
                                key={item.id}
                                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 
                                    bg-gradient-to-r from-indigo-500 to-purple-500 
                                    text-white text-xs font-medium rounded-lg
                                    shadow-sm shadow-indigo-200"
                            >
                                <span className="truncate max-w-[100px]">{item.name}</span>
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => removeTag(e, item)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') removeTag(e as unknown as React.MouseEvent, item); }}
                                    className="p-0.5 hover:bg-white/20 rounded transition-colors cursor-pointer"
                                >
                                    <X className="w-3 h-3" />
                                </span>
                            </span>
                        ))}
                        {selectedItems.length > 2 && (
                            <span className="inline-flex items-center px-2.5 py-1 
                                bg-gray-100 text-gray-600 text-xs font-medium rounded-lg
                                border border-gray-200">
                                +{selectedItems.length - 2} more
                            </span>
                        )}
                    </div>
                    
                    {/* Clear all button */}
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            e.stopPropagation();
                            clearSelection();
                        }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); clearSelection(); } }}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors group flex-shrink-0 cursor-pointer"
                        title="Clear all"
                    >
                        <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </span>
                </div>
            );
        } else {
            // Single-select mode
            if (selectedItem) {
                return renderSelectedItem 
                    ? renderSelectedItem(selectedItem) 
                    : defaultRenderSelectedItem(selectedItem);
            }
            return <span className="text-gray-400 truncate">{placeholder}</span>;
        }
    };

    return (
        <div className={width} ref={dropdownRef}>
            <div className="relative">
                {/* Custom Dropdown Trigger */}
                <motion.button
                    type="button"
                    onClick={toggleDropdown}
                    whileTap={{ scale: 0.99 }}
                    className={`
                        w-full min-h-[48px] px-3 py-2
                        bg-white
                        border-2 rounded-xl
                        text-left font-[Inter] text-sm
                        flex items-center justify-between gap-2
                        transition-all duration-200 ease-out
                        ${isOpen 
                            ? 'border-indigo-500 ring-4 ring-indigo-100 shadow-lg shadow-indigo-100' 
                            : 'border-gray-200 hover:border-gray-300 shadow-sm'
                        }
                    `}
                >
                    {renderTriggerContent()}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 ml-1"
                    >
                        <ChevronDown className={`w-4 h-4 transition-colors ${
                            isOpen ? 'text-indigo-500' : 'text-gray-400'
                        }`} />
                    </motion.span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 
                                rounded-xl shadow-xl shadow-gray-200/50 overflow-hidden"
                        >
                            {/* Search Input */}
                            {showSearch && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder={searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white
                                                transition-all duration-200 placeholder:text-gray-400"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Selected count bar for multi-select */}
                            {multiple && selectedItems.length > 0 && (
                                <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
                                    <span className="text-xs font-medium text-indigo-700">
                                        {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearSelection();
                                        }}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium 
                                            hover:underline transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Options List */}
                            <ul className="max-h-[280px] overflow-y-auto py-1">
                                {filteredItems.length === 0 ? (
                                    <li className="px-4 py-8 text-sm text-gray-400 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Search className="w-8 h-8 text-gray-300" />
                                            <span>No {countLabel.plural} found</span>
                                        </div>
                                    </li>
                                ) : (
                                    filteredItems.map((item) => {
                                        const isSelected = isItemSelected(item);

                                        return (
                                            <li
                                                key={item.id}
                                                onClick={() => handleSelect(item)}
                                                className={`
                                                    px-4 py-2.5 cursor-pointer
                                                    flex items-center gap-3
                                                    transition-all duration-100
                                                    ${isSelected
                                                        ? 'bg-indigo-50'
                                                        : 'hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                {/* Checkbox for multi-select */}
                                                {multiple && (
                                                    <div className={`
                                                        w-5 h-5 rounded-md border-2 flex items-center justify-center 
                                                        transition-all duration-150 flex-shrink-0
                                                        ${isSelected 
                                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-500 border-transparent shadow-sm' 
                                                            : 'border-gray-300 bg-white hover:border-indigo-400'
                                                        }
                                                    `}>
                                                        {isSelected && (
                                                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {/* Item content */}
                                                {renderItem ? renderItem(item, isSelected) : defaultRenderItem(item, isSelected)}
                                                
                                                {/* Checkmark for single-select */}
                                                {!multiple && isSelected && (
                                                    <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                                )}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>

                            {/* Footer with count */}
                            {showCount && filteredItems.length > 0 && (
                                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                                    <span className="text-xs text-gray-400">
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
