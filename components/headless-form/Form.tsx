"use client";

import Input from "@/components/reusable-component/input";
import React, { useState } from "react";
import Button from "@/components/reusable-component/button";
import CountryDropdown from "@/components/headless-form/country-drop-down-menu/CountryDropdown";
import { useForm } from "./hook/useForm";
import { Country } from "@/components/headless-form/country-drop-down-menu/api/countryDropDownMenuService";
import { HeadlessFormProps, FormChild, FieldValidation } from "./types/types";
import PhoneNumberInputField from "./PhoneNumberInputField";
import DropDownMenu from "../reusable-component/DropDownMenu";
import SalarySlider from "./SalarySlider"


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
            const currentPhone = values[phoneFieldName] || "";
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
                <DropDownMenu 
                    key={index}
                    title = {child.title}
                    name = {child.name}
                    placeholder = {child.placeholder}
                    value = {values[child.name] || ""}
                    onChange = {(e) => handleChange(child.name, e.target.value)}
                    onBlur = {() => handleBlur(child.name)}
                    options = {child.options}
                    onClear = {() => handleChange(child.name, "")} />
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
            return (
                <PhoneNumberInputField 
                    key={index}
                    title = {child.title}
                    name = {child.name}
                    selectedDialCode = {selectedDialCode}
                    fieldError = {fieldError} 
                    placeholder = {child.placeholder}
                    value = {selectedDialCode ? extractLocalNumber(values[child.name] || "") : (values[child.name] || "")}
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
                    value={values[child.name] || ""}
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