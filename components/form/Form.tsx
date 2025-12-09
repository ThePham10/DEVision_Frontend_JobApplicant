"use client";

import Input from "@/components/input";
import React, { useState } from "react";
import Button from "@/components/button";
import CountryDropdown from "@/components/form/country-drop-down-menu/CountryDropdown";
import { useForm, FormValues } from "./hook/useForm";
import { FieldValidation } from "./hook/validation";
import { Country } from "@/components/form/country-drop-down-menu/api/countryDropDownMenuService";

type FormChild = {
    title: string;
    type: string;
    placeholder: string;
}

type FormConfig = {
    className?: string;
    children: FormChild[];
    buttonText: string;
}

type HeadlessFormProps = {
    config: FormConfig;
    onSubmit: () => void;
};

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
        handleGoogle,
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

        if (child.type === "country") {
            return (
                <CountryDropdown 
                    key={index} 
                    title={child.title}
                    onChange={(country) => handleCountryChange(country)}
                />
            );
        }

        // Special handling for phone/tel field
        if (child.type === "tel" && child.name === phoneFieldName) {
            return (
                <div key={index} className="mb-4">
                    <label className="block font-[Inter] text-[#0F1729] mb-2">
                        {child.title}
                    </label>
                    <div className="relative flex">
                        {/* Dial code prefix */}
                        {selectedDialCode && (
                            <div className="flex items-center px-3 bg-[#F8FAFC] border border-r-0 border-[#E1E7EF] rounded-l text-[#0F1729] font-medium">
                                {selectedDialCode}
                            </div>
                        )}
                        {/* Phone input */}
                        <input
                            type="tel"
                            name={child.name}
                            placeholder={selectedDialCode ? "Enter phone number" : child.placeholder}
                            value={selectedDialCode ? extractLocalNumber(values[child.name] || "") : (values[child.name] || "")}
                            onChange={(e) => handlePhoneChange(selectedDialCode ? `${selectedDialCode} ${e.target.value}` : e.target.value)}
                            onBlur={() => handleBlur(child.name)}
                            className={`
                                flex-1 h-[40px] px-3 py-2
                                bg-white border border-[#E1E7EF] 
                                ${selectedDialCode ? 'rounded-r' : 'rounded'}
                                font-[Inter] text-gray-700
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]
                                ${fieldError ? 'border-red-500' : ''}
                            `}
                        />
                    </div>
                    {/* Error message */}
                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">{fieldError}</p>
                    )}
                    {/* Helper text */}
                    {!selectedDialCode && !fieldError && (
                        <p className="mt-1 text-sm text-gray-500">
                            Please select a country first to auto-fill the dial code
                        </p>
                    )}
                </div>
            );
        }

        return (
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
        );
    };

    return (
        <div>
            <form className="flex flex-col">
                {config.children.map((child : FormChild, index : number) => (
                    <Input
                        key={index}
                        title={child.title}
                        type={child.type}
                        placeholder={child.placeholder}
                    />
                ))}
            </form>
            <Button text={config.buttonText} onClick={onSubmit} style={"w-full"}/>
        </div>
    )
}