interface DropDownMenuProps {
    title: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClear: () => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const DropDownMenu = ({title, name, placeholder, value, onChange, onClear, onBlur, options} : DropDownMenuProps) => {
    const hasValue = value && value !== "";

    return (
        <div className="mb-4">
                        <label className="block font-[Inter] text-[#0F1729] mb-2">
                            {title}
                        </label>
                        <div className="relative">
                            <select
                                name={name}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                className={`
                                    w-full h-[40px] px-3 py-2
                                    bg-white border border-[#E1E7EF] rounded
                                    font-[Inter] text-gray-700
                                    transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]
                                    appearance-none cursor-pointer
                                `}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: hasValue ? '4rem' : '2.5rem'
                                }}
                            >
                                <option value="">{placeholder}</option>
                                {options.map((option, optIndex) => (
                                    <option key={optIndex} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {/* Clear button */}
                            {hasValue && (
                                <button
                                    type="button"
                                    onClick={onClear}
                                    className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Clear selection"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
    )
}

export default DropDownMenu
