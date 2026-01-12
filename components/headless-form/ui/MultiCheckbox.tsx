"use client";
import { SelectOption } from "../types/types";

// Define the multi check box props
interface MultiCheckboxProps {
    title: string;
    name: string;
    options: SelectOption[];
    value: string[];
    onChange: (selected: string[]) => void;
    errorMessage?: string;
}

/**
 * MultiCheckbox component
 * @param title - The title of the multi checkbox
 * @param name - The name of variable of the multi checkbox
 * @param options - The options for the multi checkbox
 * @param value - The value of the multi checkbox
 * @param onChange - The function to be called when the multi checkbox value changes
 * @param errorMessage - The error message for the multi checkbox
 */
const MultiCheckbox = ({ title, name, options, value = [], onChange, errorMessage }: MultiCheckboxProps) => {
    const handleCheckboxChange = (optionId: string) => {
        if (value.includes(optionId)) {
            // Remove if already selected
            onChange(value.filter((id) => id !== optionId));
        } else {
            // Add if not selected
            onChange([...value, optionId]);
        }
    };

    return (
        <div className="mb-4">
            {/*Title*/}
            <label className="font-[Inter] font-medium block mb-3">
                {title}
            </label>

            {/*Option selection list*/}
            <div className="flex flex-wrap gap-3">
                {options.map((option) => {
                    const isSelected = value.includes(option.id);
                    return (
                        <label
                            key={option.id}
                            className={`
                                relative flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer
                                border-2 transition-all duration-200 select-none font-[Inter]
                                ${isSelected 
                                    ? "border-[#2463eb] bg-[#2463eb]/10 text-[#2463eb]" 
                                    : "border-[#E1E7EF] bg-white text-gray-700 hover:border-[#2463eb]/50 hover:bg-[#2463eb]/5"
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                name={`${name}[]`}
                                value={option.id}
                                checked={isSelected}
                                onChange={() => handleCheckboxChange(option.id)}
                                className="sr-only"
                            />
                            {/* Custom checkbox indicator */}
                            <div
                                className={`
                                    w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                                    ${isSelected 
                                        ? "border-[#2463eb] bg-[#2463eb]" 
                                        : "border-gray-300 bg-white"
                                    }
                                `}
                            >
                                {isSelected && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm font-medium">{option.name}</span>
                        </label>
                    );
                })}
            </div>
            {/* Helper text for employment status logic */}
            {name === "employmentStatus" && (
                <p className="mt-2 text-xs text-gray-500 font-[Inter]">
                    If neither Full-time nor Part-time is selected, search includes both
                </p>
            )}
            {/* Error message */}
            {errorMessage && (
                <p className="mt-1 text-sm text-red-500 font-[Inter]">{errorMessage}</p>
            )}
        </div>
    );
};

export default MultiCheckbox;
