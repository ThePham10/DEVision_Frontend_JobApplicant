interface SalarySliderProps {
    title: string,
    name: string,
    min?: number,
    max?: number,
    step?: number,
    currentValue: number,
    formatValue?: (value: number) => string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SalarySlider = ({title, name, min = 0, max = 100, step = 1, currentValue, formatValue,onChange}: SalarySliderProps) => {
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const formatedValue = formatValue || ((val: number) => `$${val.toLocaleString()}`);
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <label className="font-[Inter] font-medium">
                    {title}
                </label>
                <span 
                    className="font-[Inter] font-semibold text-lg bg-[#2463eb] px-3 py-1 rounded-full text-right text-white"
                    style={{ minWidth: '100px', fontVariantNumeric: 'tabular-nums' }}
                >
                    {formatedValue(currentValue)}
                </span>
            </div>
            <div className="relative pt-1">
                {/* Track background */}
                <div className="h-2 bg-[#E1E7EF] rounded-full overflow-hidden">
                    {/* Filled track - no transition for smooth dragging */}
                    <div 
                        className="h-full bg-gradient-to-r from-[#2463EB] to-[#E06565] rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {/* Actual range input (invisible but functional) */}
                <input
                    type="range"
                    name={name}
                    min={min ?? 0}
                    max={max ?? 100}
                    step={step ?? 1}
                    value={Number(currentValue) || min}
                    onChange={onChange}
                    className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                    style={{ top: '4px' }}
                />
                {/* Custom thumb - no transition for smooth dragging */}
                <div 
                    className="absolute w-5 h-5 bg-white border-2 border-[#2463eb] rounded-full shadow-md pointer-events-none"
                    style={{ 
                        left: `calc(${percentage}% - 10px)`,
                        top: '4px',
                        boxShadow: '0 2px 8px rgba(36, 40, 248, 0.3)'
                    }}
                >
                    {/* Inner dot */}
                    <div className="absolute inset-1 bg-[#2463eb] rounded-full" />
                </div>
            </div>
            {/* Min/Max labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-400 font-[Inter]">
                <span>{formatedValue(min)}</span>
                <span>{formatedValue(max)}</span>
            </div>
        </div>
    )
}

export default SalarySlider