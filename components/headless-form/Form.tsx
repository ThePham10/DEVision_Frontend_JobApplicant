"use client";

import Input from "@/components/reusable-component/Input";
import React, { useState } from "react";
import Button from "@/components/reusable-component/Button";
import CountryDropdown from "@/components/headless-form/country-drop-down-menu/CountryDropdown";
import { useForm } from "./hook/useForm";
import { Country } from "@/components/headless-form/country-drop-down-menu/api/countryDropDownMenuService";
import { HeadlessFormProps, FormChild, FieldValidation } from "./types/types";
import PhoneNumberInputField from "./PhoneNumberInputField";
import SalarySlider from "./SalarySlider"
import Dropdown from "../reusable-component/headless-dropdown/ui/Dropdown";


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
            return (
                <div key={index} className={colSpanClass}>
                    <CountryDropdown 
                        title={child.title}
                        onChange={(country) => handleCountryChange(country)}
                        errorMessage={fieldError}
                    />
                </div>
            );
        }

        // Generic select/dropdown field
        if (child.type === "select" && child.options) {
            return (
                <div key={index}>
                    <label>
                        {child.title}
                    </label>
                    <Dropdown
                        items = {child.options}
                        onChange={(value) => handleChange(child.name, value.id)}
                        width="w-full"
                    />
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

        // Range slider field
        if (child.type === "range") {
            return (
                <SalarySlider 
                    key={index}
                    title = {child.title}
                    name = {child.name}
                    min = {child.min}
                    max = {child.max}
                    step = {child.step}
                    currentValue = {Number(values[child.name]) || (child.min ?? 0)}
                    onChange = {(e) => handleChange(child.name, e.target.value)}
                />
            );
        }

        // Special handling for phone/tel field
        if (child.type === "tel" && child.name === phoneFieldName) {
            const phoneValue = String(values[child.name] || "");
            return (
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

export { commonValidations, loginValidations, patterns } from "./hook/validation";