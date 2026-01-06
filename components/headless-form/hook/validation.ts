// Validation types and utilities for form fields

import { ValidationRule, FieldValidation, ValidationErrors, FormFieldValue, FormValues } from "../types/types";

// ============================================================
// PASSWORD VALIDATION
// Requirements:
// a) At least 8 characters
// b) At least 1 number
// c) At least 1 special character (e.g., $#@!)
// d) At least 1 capitalized letter
// ============================================================
export const passwordValidationRules: ValidationRule[] = [
    {
        validate: (value) => typeof value === 'string' && value.length >= 8,
        message: "Password must be at least 8 characters",
    },
    {
        validate: (value) => typeof value === 'string' && /[0-9]/.test(value),
        message: "Password must contain at least 1 number",
    },
    {
        validate: (value) => typeof value === 'string' && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(value),
        message: "Password must contain at least 1 special character (e.g., $#@!)",
    },
    {
        validate: (value) => typeof value === 'string' && /[A-Z]/.test(value),
        message: "Password must contain at least 1 uppercase letter",
    },
];

// ============================================================
// EMAIL VALIDATION
// Requirements:
// a) Contains exactly one '@' symbol
// b) Contains at least one '.' (dot) after the '@' symbol
// c) Total length must be less than 255 characters
// d) No spaces or prohibited characters (e.g., ( ) [ ] ; :)
// ============================================================
export const emailValidationRules: ValidationRule[] = [
    {
        validate: (value) => typeof value === 'string' && value.length < 255,
        message: "Email must be less than 255 characters",
    },
    {
        validate: (value) => typeof value === 'string' && (value.match(/@/g) || []).length === 1,
        message: "Email must contain exactly one '@' symbol",
    },
    {
        validate: (value) => {
            if (typeof value !== 'string') return false;
            const atIndex = value.indexOf('@');
            if (atIndex === -1) return false;
            const afterAt = value.substring(atIndex + 1);
            return afterAt.includes('.');
        },
        message: "Email must contain at least one '.' after the '@' symbol",
    },
    {
        validate: (value) => typeof value === 'string' && !/[\s()\[\];:]/.test(value),
        message: "Email cannot contain spaces or prohibited characters ( ) [ ] ; :",
    },
];

// ============================================================
// PHONE NUMBER VALIDATION
// Requirements:
// a) Contains only digits and must start with a valid international dial code (e.g., +84, +49)
// b) The local number (after dial code) must contain at most 13 digits
// ============================================================
export const phoneValidationRules: ValidationRule[] = [
    {
        validate: (value) => typeof value === 'string' && /^\+\d+(\s\d+)?$/.test(value.replace(/\s+/g, ' ').trim()),
        message: "Phone must start with '+' followed by country code and contain only digits",
    },
    {
        validate: (value) => {
            if (typeof value !== 'string') return false;
            // Extract local number (after the dial code and space)
            const parts = value.trim().split(/\s+/);
            // If there's no space, check total digits after +
            if (parts.length === 1) {
                const digitsOnly = value.replace(/[^\d]/g, '');
                return digitsOnly.length <= 15; // Total with country code
            }
            // Get the local number part (everything after first part)
            const localNumber = parts.slice(1).join('').replace(/[^\d]/g, '');
            return localNumber.length <= 13 && localNumber.length >= 1;
        },
        message: "Local phone number must contain between 1 and 13 digits",
    },
];

// Common validation patterns (legacy support)
export const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+[\d\s]{7,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
};

// Validate a single field (with optional access to all values for cross-field validation)
export function validateField(
    value: FormFieldValue,
    validation: FieldValidation,
    allValues?: FormValues
): string | null {
    // Handle File validation
    if (value instanceof File) {
        // For file inputs, only check if required
        if (validation.required && !value) {
            return validation.requiredMessage || "This field is required";
        }
        // Run custom validations for files
        if (validation.custom) {
            for (const rule of validation.custom) {
                if (!rule.validate(value, allValues)) {
                    return rule.message;
                }
            }
        }
        return null;
    }

    // Handle null/undefined
    if (value === null || value === undefined) {
        if (validation.required) {
            return validation.requiredMessage || "This field is required";
        }
        return null;
    }

    // Handle string[] (multi-select) validation
    if (Array.isArray(value)) {
        // Required check for arrays
        if (validation.required && value.length === 0) {
            return validation.requiredMessage || "This field is required";
        }
        // Skip other validations if empty and not required
        if (value.length === 0) return null;
        // Custom validations for arrays
        if (validation.custom) {
            for (const rule of validation.custom) {
                if (!rule.validate(value, allValues)) {
                    return rule.message;
                }
            }
        }
        return null;
    }

    // Handle string validation (existing logic)
    const trimmedValue = value.trim();

    // Required check
    if (validation.required && !trimmedValue) {
        return validation.requiredMessage || "This field is required";
    }

    // Skip other validations if empty and not required
    if (!trimmedValue) return null;

    // Min length check
    if (validation.minLength && trimmedValue.length < validation.minLength) {
        return `Must be at least ${validation.minLength} characters`;
    }

    // Max length check
    if (validation.maxLength && trimmedValue.length > validation.maxLength) {
        return `Must be no more than ${validation.maxLength} characters`;
    }

    // Pattern check
    if (validation.pattern && !validation.pattern.test(trimmedValue)) {
        return validation.patternMessage || "Invalid format";
    }

    // Match check (cross-field validation)
    if (validation.match && allValues) {
        const matchValue = allValues[validation.match] || "";
        if (trimmedValue !== matchValue) {
            return validation.matchMessage || `Must match ${validation.match}`;
        }
    }

    // Custom validations
    if (validation.custom) {
        for (const rule of validation.custom) {
            if (!rule.validate(trimmedValue, allValues)) {
                return rule.message;
            }
        }
    }

    return null;
}

// Validate all fields
export function validateForm(
    values: FormValues,
    validations: Record<string, FieldValidation>
): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const [fieldName, validation] of Object.entries(validations)) {
        const value = values[fieldName] ?? "";
        const error = validateField(value, validation, values);
        if (error) {
            errors[fieldName] = error;
        }
    }

    return errors;
}

// Check if form has errors
export function hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}

// ============================================================
// COMMON INPUT VALIDATION CONFIGURATIONS
// ============================================================
export const commonValidations = {
    email: {
        required: true,
        requiredMessage: "Email is required",
        custom: emailValidationRules,
    } as FieldValidation,
    
    password: {
        required: true,
        requiredMessage: "Password is required",
        custom: passwordValidationRules,
    } as FieldValidation,
    
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
    } as FieldValidation,
    
    phone: {
        // Phone is optional, but if provided, must be valid
        custom: phoneValidationRules,
    } as FieldValidation,
};

export const loginValidations = {
    email: {
        required: true,
        requiredMessage: "Email is required",
    } as FieldValidation,

    password: {
        required: true,
        requiredMessage: "Password is required",
    } as FieldValidation,
};

