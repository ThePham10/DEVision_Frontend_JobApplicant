"use client";

import { useState } from "react";
import {Button, Input} from "@/components/reusable-component";
import CountryDropdown from "@/components/headless-form/country-drop-down-menu/CountryDropdown";
import { useForm } from "../hook/useForm";
import { Country } from "@/components/headless-form/country-drop-down-menu/api/countryDropDownMenuService";
import { HeadlessFormProps, FormChild, FieldValidation } from "../types/types";
import PhoneNumberInputField from "./PhoneNumberInputField";
import Dropdown from "../../headless-dropdown/ui/Dropdown";
import MultiCheckbox from "./MultiCheckbox";
import DualRangeSlider from "./DualRangeSlider";


export const HeadlessForm: React.FC<HeadlessFormProps> = ({ 
    config, 
    onSubmit,
    initialValues = {},
    validateOnChange = false,
    validateOnBlur = true,
}) => {
    // Track the selected dial code
    const [selectedDialCode, setSelectedDialCode] = useState<string>("");

    // Build validations object from config
    const validations = config.children.reduce((acc, child) => {
        if (child.validation) {
            acc[child.name] = child.validation;
        }
        return acc;
    }, {} as Record<string, FieldValidation>);

    // Find phone field name (defaults to 'phone')
    const phoneFieldName = config.phoneFieldName || 'phone';

    const {
        values,
        touched,
        isSubmitting,
        handleChange,
        handleFileChange,
        handleBlur,
        handleSubmit,
        getFieldError,
    } = useForm({
        initialValues,
        validations,
        onSubmit,
        validateOnChange,
        validateOnBlur,
    });

    // Handle country selection - save dial code and update phone
    const handleCountryChange = (country: Country) => {
        // Update country field with country code
        handleChange("country", country.value);
        
        // Save dial code for later use
        const dialCode = country.dialCode;
        setSelectedDialCode(dialCode);
        
        if (dialCode) {
            // Get current phone value and extract just the local number
            const currentPhone = String(values[phoneFieldName] || "");
            const localNumber = extractLocalNumber(currentPhone);
            
            // Set new phone value with dial code
            handleChange(phoneFieldName, formatPhoneWithDialCode(dialCode, localNumber));
        }
    };

    // Extract local number (remove dial code prefix)
    const extractLocalNumber = (phone: string): string => {
        return phone.replace(/^\+\d+\s*/, "").trim();
    };

    // Format phone with dial code
    const formatPhoneWithDialCode = (dialCode: string, localNumber: string): string => {
        if (!dialCode) return localNumber;
        if (!localNumber) return dialCode;
        return `${dialCode} ${localNumber}`;
    };

    // Handle phone input change - preserve dial code
    const handlePhoneChange = (value: string) => {
        if (selectedDialCode) {
            // Extract local number from input (in case user tries to modify dial code)
            const localNumber = extractLocalNumber(value);
            // Always format with the selected dial code
            handleChange(phoneFieldName, formatPhoneWithDialCode(selectedDialCode, localNumber));
        } else {
            // No country selected yet, just store the value
            handleChange(phoneFieldName, value);
        }
    };

    const renderField = (child: FormChild, index: number) => {
        const fieldError = getFieldError(child.name);

        // Get colSpan class for grid layout
        const colSpanClass = child.colSpan ? `col-span-${child.colSpan}` : "";

        if (child.type === "country") {
            // Handle country selection based on returnType config
            const handleCountrySelect = (country: Country) => {
                const returnType = child.returnType || "value"; // Default to value (code)
                
                if (returnType === "label") {
                    handleChange(child.name, country.label); // Return country name
                } else if (returnType === "object") {
                    handleChange(child.name, JSON.stringify(country)); // Return full object
                } else {
                    handleChange(child.name, country.value); // Return country code (default)
                }
                
                // Also handle phone dial code if this is the main country field
                if (child.name === "country") {
                    handleCountryChange(country);
                }
            };

            return (
                <div key={index} className={colSpanClass}>
                    <CountryDropdown 
                        title={child.title}
                        onChange={handleCountrySelect}
                        errorMessage={fieldError}
                        initialValue={values[child.name] as string}
                    />
                </div>
            );
        }

        // Generic select/dropdown field
        if (child.type === "select" && child.options) {
            const handleDropdownChange = (value: { id: string } | { id: string }[] | null) => {
                if (child.multiple) {
                    // Multi-select: extract array of IDs
                    const ids = Array.isArray(value) ? value.map(v => v.id) : [];
                    handleChange(child.name, ids as unknown as string);
                } else {
                    // Single select: extract single ID
                    const id = value && !Array.isArray(value) ? value.id : "";
                    handleChange(child.name, id);
                }
            };

            // Get initial values for dropdown from form state
            const currentValue = values[child.name];
            const defaultValues = child.multiple && Array.isArray(currentValue) 
                ? currentValue as string[] 
                : [];
            const defaultValue = !child.multiple && typeof currentValue === 'string' 
                ? currentValue 
                : undefined;

            return (
                <div key={index} className={colSpanClass}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {child.title}
                    </label>
                    <Dropdown
                        items={child.options}
                        onChange={handleDropdownChange}
                        multiple={child.multiple}
                        placeholder={child.placeholder}
                        width="w-full"
                        defaultValue={defaultValue}
                        defaultValues={defaultValues}
                    />
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                </div>
            );
        }

        // File input field
        if (child.type === "file") {
            const fileValue = values[child.name];
            const fileName = fileValue instanceof File ? fileValue.name : "";
            return (
                <div key={index} className={colSpanClass}>
                    <label>
                        {child.title}
                    </label>
                    <div className="relative">
                        <input
                            key={index}
                            type="file"
                            name={child.name}
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleFileChange(child.name, file);
                            }}
                            onBlur={() => handleBlur(child.name)}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                cursor-pointer"
                        />
                        {fileName && (
                            <p className="mt-1 text-sm text-gray-500">Selected: {fileName}</p>
                        )}
                    </div>
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                </div>
            );
        }

        // Multi-checkbox field (for employment status)
        if (child.type === "multi-checkbox" && child.options) {
            const selectedValues = Array.isArray(values[child.name])
                ? values[child.name] as string[]
                : [];
            return (
                <div key={index} className={colSpanClass}>
                    <MultiCheckbox
                        title={child.title}
                        name={child.name}
                        options={child.options}
                        value={selectedValues}
                        onChange={(selected) => handleChange(child.name, selected as unknown as string)}
                        errorMessage={fieldError}
                    />
                </div>
            );
        }

        // Dual range slider (for salary min/max)
        if (child.type === "dual-range") {
            const minKey = `${child.name}_min`;
            const maxKey = `${child.name}_max`;
            const minVal = Number(values[minKey]) || (child.min ?? 0);
            const maxVal = Number(values[maxKey]) || (child.max ?? 200000);
            return (
                <div key={index} className={colSpanClass}>
                    <DualRangeSlider
                        title={child.title}
                        name={child.name}
                        min={child.min}
                        max={child.max}
                        step={child.step}
                        minValue={minVal}
                        maxValue={maxVal}
                        onChange={(newMin, newMax) => {
                            handleChange(minKey, String(newMin));
                            handleChange(maxKey, String(newMax));
                        }}
                    />
                </div>
            );
        }

        // Special handling for phone/tel field
        if (child.type === "tel" && child.name === phoneFieldName) {
            const phoneValue = String(values[child.name] || "");
            return (
                <div key={index} className={colSpanClass}>
                    <PhoneNumberInputField 
                        key={index}
                        title = {child.title}
                        name = {child.name}
                        selectedDialCode = {selectedDialCode}
                        fieldError = {fieldError} 
                        placeholder = {child.placeholder}
                        value = {selectedDialCode ? extractLocalNumber(phoneValue) : phoneValue}
                        onChange = {(e) => handlePhoneChange(e.target.value)}
                        onBlur = {() => handleBlur(child.name)}
                    />
                </div>
            );
        }

        if (child.type === "textarea") {
            return (
                <div key={index} className={colSpanClass}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {child.title}
                    </label>
                    <textarea
                        name={child.name}
                        placeholder={child.placeholder}
                        value={String(values[child.name] || "")}
                        onChange={(e) => handleChange(child.name, e.target.value)}
                        onBlur={() => handleBlur(child.name)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                </div>
            );
        }

        return (
            <div key={index} className={colSpanClass}>
                <Input
                    key={index}
                    title={child.title}
                    name={child.name}
                    type={child.type}
                    placeholder={child.placeholder}
                    value={String(values[child.name] || "")}
                    onChange={(e) => handleChange(child.name, e.target.value)}
                    onBlur={() => handleBlur(child.name)}
                    errorMessage={fieldError}
                    state={fieldError ? "error" : touched[child.name] && !fieldError ? "success" : "default"}
                />
            </div>
        );
    };

    // Build layout classes based on config
    const getLayoutClasses = () => {
        const layout = config.layout || { type: "flex", direction: "column" };
        const gap = layout.gap || "4";
        
        if (layout.type === "grid") {
            const cols = typeof layout.columns === "number" 
                ? `grid-cols-${layout.columns}` 
                : "";
            return `grid ${cols} gap-${gap}`;
        }
        
        // Default: flex
        const direction = layout.direction === "row" ? "flex-row" : "flex-col";
        const wrap = layout.wrap ? "flex-wrap" : "";
        return `flex ${direction} ${wrap} gap-${gap}`;
    };


    return (
        <div>
            <form className={`${getLayoutClasses()} ${config.formClassName}`} onSubmit={handleSubmit}>
                {config.children.map((child: FormChild, index: number) =>
                    renderField(child, index)
                )}
                <Button 
                    type = "submit"
                    text={isSubmitting ? "Submitting..." : config.buttonText} 
                    style={`w-full ${config.buttonClassName || ""}`} 
                />
            </form>
        </div>
    );
};

export { commonValidations, loginValidations, patterns } from "../hook/validation";