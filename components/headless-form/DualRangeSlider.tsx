"use client";

import { useCallback, useEffect, useRef } from "react";

interface DualRangeSliderProps {
    title: string;
    name: string;
    min?: number;
    max?: number;
    step?: number;
    minValue: number;
    maxValue: number;
    formatValue?: (value: number) => string;
    onChange: (minValue: number, maxValue: number) => void;
}

const DualRangeSlider = ({
    title,
    name,
    min = 0,
    max = 200000,
    step = 1000,
    minValue,
    maxValue,
    formatValue,
    onChange,
}: DualRangeSliderProps) => {
    const minValueRef = useRef<HTMLInputElement>(null);
    const maxValueRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    const formattedValue = formatValue || ((val: number) => `$${val.toLocaleString()}`);

    // Update the range highlight
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (rangeRef.current) {
            const minPct = getPercent(minValue);
            const maxPct = getPercent(maxValue);
            rangeRef.current.style.left = `${minPct}%`;
            rangeRef.current.style.width = `${maxPct - minPct}%`;
        }
    }, [minValue, maxValue, getPercent]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - step);
        onChange(value, maxValue);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + step);
        onChange(minValue, value);
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <label className="font-[Inter] font-medium">
                    {title}
                </label>
                <div className="flex items-center gap-2">
                    <span className="font-[Inter] font-semibold text-sm bg-[#2463eb] px-3 py-1 rounded-full text-white"
                        style={{ minWidth: "90px", textAlign: "center", fontVariantNumeric: "tabular-nums" }}
                    >
                        {formattedValue(minValue)}
                    </span>
                    <span className="text-gray-400 font-medium">—</span>
                    <span className="font-[Inter] font-semibold text-sm bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-3 py-1 rounded-full text-white"
                        style={{ minWidth: "90px", textAlign: "center", fontVariantNumeric: "tabular-nums" }}
                    >
                        {maxValue >= max ? "No limit" : formattedValue(maxValue)}
                    </span>
                </div>
            </div>

            {/* Slider container */}
            <div className="relative h-2 mt-6 mb-4">
                {/* Track background */}
                <div className="absolute w-full h-2 bg-[#E1E7EF] rounded-full" />

                {/* Highlighted range */}
                <div
                    ref={rangeRef}
                    className="absolute h-2 bg-gradient-to-r from-[#2463EB] to-[#7C3AED] rounded-full"
                />

                {/* Min range input */}
                <input
                    type="range"
                    name={`${name}_min`}
                    ref={minValueRef}
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}
                    className="slider-thumb slider-thumb-blue z-20"
                    style={{ top: 0 }}
                />

                {/* Max range input */}
                <input
                    type="range"
                    name={`${name}_max`}
                    ref={maxValueRef}
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="slider-thumb slider-thumb-purple z-30"
                    style={{ top: 0 }}
                />
            </div>

            {/* Min/Max labels */}
            <div className="flex justify-between text-xs text-gray-400 font-[Inter]">
                <span>{formattedValue(min)}</span>
                <span>{formattedValue(max)}+</span>
            </div>

            {/* Helper text */}
            <p className="mt-2 text-xs text-gray-500 font-[Inter]">
                Drag to set minimum and maximum salary. Jobs with undeclared salary are always included.
            </p>
        </div>
    );
};

export default DualRangeSlider;
