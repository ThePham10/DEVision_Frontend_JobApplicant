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

/**
 * HeadlessForm component
 * HeadlessForm <- Headless form hook
 * @param config - The configuration including the fields for the form
 * @param onSubmit - The function to be called when the form is submitted
 * @param initialValues - The initial values for the form fields
 * @param validateOnChange - Whether to validate the form on field change
 * @param validateOnBlur - Whether to validate the form on field blur
 */
export const HeadlessForm: React.FC<HeadlessFormProps> = ({ 
    config, 
    onSubmit,
    initialValues = {},
    validateOnChange = false,
    validateOnBlur = true,
}) => {
    // Selected dial code state
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

    // Form hook
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
        const returnedPhoneNum = localNumber.replace(/\s/g, '').replace(/^0/, '');

        return `${dialCode} ${returnedPhoneNum}`;
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

    /**
     * Render a form field based on its type 
     * (country, select, file, multi-checkbox, dual-range, tel, textarea, input(default))
     * @param child - The form field configuration
     * @param index - The index of the field in the form
     * @returns The rendered form field component
     */
    const renderField = (child: FormChild, index: number) => {
        const fieldError = getFieldError(child.name);

        // Get colSpan class for grid layout
        const colSpanClass = child.colSpan ? `col-span-${child.colSpan}` : "";

        // Render the country drop down if type is country
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

        // Render the generic drop down if type is select
        if (child.type === "select" && child.options) {
            // Function for handling dropdown change (multiple selection / single selection)
            const handleDropdownChange = (value: { id: string; name?: string; value?: string } | { id: string; name?: string; value?: string }[] | null) => {
                const returnType = child.returnType || "value"; // Default to "value" (id)
                
                // Check whether the field allows multiple selection
                if (child.multiple) {
                    // Multi-select: extract array based on returnType
                    if (Array.isArray(value)) {
                        let result: string[];
                        if (returnType === "label") {
                            result = value.map(v => v.name || v.id);
                        } else if (returnType === "object") {
                            result = value.map(v => JSON.stringify(v));
                        } else {
                            // "value" - return id by default, or value if available
                            result = value.map(v => v.value || v.id);
                        }
                        handleChange(child.name, result as unknown as string);
                    } else {
                        handleChange(child.name, [] as unknown as string);
                    }
                } else {
                    // Single select: extract value based on returnType
                    if (value && !Array.isArray(value)) {
                        let result: string;
                        if (returnType === "label") {
                            result = value.name || value.id;
                        } else if (returnType === "object") {
                            result = JSON.stringify(value);
                        } else {
                            // "value" - return id by default, or value if available
                            result = value.value || value.id;
                        }
                        handleChange(child.name, result);
                    } else {
                        handleChange(child.name, "");
                    }
                }
            };

            // Get initial values for dropdown from form state
            const currentValue = values[child.name];
            // If multiple selection is enabled, extract array of values
            const defaultValues = child.multiple && Array.isArray(currentValue) 
                ? currentValue as string[] 
                : [];
            
            // If single selection is enabled, extract single value
            const defaultValue = !child.multiple && typeof currentValue === 'string' 
                ? currentValue 
                : undefined;

            return (
                <div key={index} className={colSpanClass}>
                    {/*Title*/}
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {child.title}
                    </label>

                    {/*Dropdown*/}
                    <Dropdown
                        items={child.options}
                        onChange={handleDropdownChange}
                        multiple={child.multiple}
                        placeholder={child.placeholder}
                        width="w-full"
                        defaultValue={defaultValue}
                        defaultValues={defaultValues}
                    />

                    {/*Error*/}
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                </div>
            );
        }

        // Render the file upload field if type is file
        if (child.type === "file") {
            // Get the file value from form state
            const fileValue = values[child.name];
            const fileName = fileValue instanceof File ? fileValue.name : "";

            return (
                <div key={index} className={colSpanClass}>
                    {/*Title*/}
                    <label>
                        {child.title}
                    </label>
                    
                    {/*File Upload*/}
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

                        {/*Selected file name*/}
                        {fileName && (
                            <p className="mt-1 text-sm text-gray-500">Selected: {fileName}</p>
                        )}
                    </div>

                    {/*Error*/}
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                </div>
            );
        }

        // Render the multi-checkbox field if type is multi-checkbox
        if (child.type === "multi-checkbox" && child.options) {
            // Get the value from the form state
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

        // Render the dual range slider if type is dual-range
        if (child.type === "dual-range") {
            // Get the value from the form state
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

        // Render the phone number input field if type is tel
        if (child.type === "tel" && child.name === phoneFieldName) {
            // Get phone number value from the form state
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

        // Render the textarea field if type is textarea
        if (child.type === "textarea") {
            return (
                <div key={index} className={colSpanClass}>
                    {/*Tilte*/}
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {child.title}
                    </label>

                    {/*Text area*/}
                    <textarea
                        name={child.name}
                        placeholder={child.placeholder}
                        value={String(values[child.name] || "")}
                        onChange={(e) => handleChange(child.name, e.target.value)}
                        onBlur={() => handleBlur(child.name)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />

                    {/*Error*/}
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