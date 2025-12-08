// Custom hook for form state and validation

import { useState, useCallback } from "react";
import { 
    validateField, 
    validateForm, 
    hasErrors,
    FieldValidation, 
    ValidationErrors 
} from "./validation";

export type FormValues = Record<string, string>;

type UseFormOptions = {
    initialValues?: FormValues;
    validations?: Record<string, FieldValidation>;
    onSubmit?: (values: FormValues) => void | Promise<void>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

type UseFormReturn = {
    values: FormValues;
    errors: ValidationErrors;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isValid: boolean;
    handleChange: (name: string, value: string) => void;
    handleBlur: (name: string) => void;
    handleSubmit: (e?: React.FormEvent) => void;
    setFieldValue: (name: string, value: string) => void;
    setFieldError: (name: string, error: string) => void;
    resetForm: () => void;
    getFieldProps: (name: string) => {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    };
    getFieldError: (name: string) => string | undefined;
    isFieldTouched: (name: string) => boolean;
};

export function useForm({
    initialValues = {},
    validations = {},
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
}: UseFormOptions = {}): UseFormReturn {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate a single field
    const validateSingleField = useCallback(
        (name: string, value: string, currentValues: FormValues) => {
            const validation = validations[name];
            if (!validation) return null;
            return validateField(value, validation, currentValues);
        },
        [validations]
    );

    // Handle value change
    const handleChange = useCallback(
        (name: string, value: string) => {
            setValues(prev => {
                const newValues = { ...prev, [name]: value };
                
                if (validateOnChange) {
                    const error = validateSingleField(name, value, newValues);
                    setErrors(prevErrors => {
                        const newErrors = { ...prevErrors };
                        if (error) {
                            newErrors[name] = error;
                        } else {
                            delete newErrors[name];
                        }
                        return newErrors;
                    });
                }
                
                return newValues;
            });
        },
        [validateOnChange, validateSingleField]
    );

    // Handle blur
    const handleBlur = useCallback(
        (name: string) => {
            setTouched(prev => ({ ...prev, [name]: true }));

            if (validateOnBlur) {
                const value = values[name] || "";
                const error = validateSingleField(name, value, values);
                setErrors(prev => {
                    const newErrors = { ...prev };
                    if (error) {
                        newErrors[name] = error;
                    } else {
                        delete newErrors[name];
                    }
                    return newErrors;
                });
            }
        },
        [validateOnBlur, values, validateSingleField]
    );

    // Handle form submission
    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();

            // Mark all fields as touched
            const allTouched = Object.keys(validations).reduce(
                (acc, name) => ({ ...acc, [name]: true }),
                {}
            );
            setTouched(allTouched);

            // Validate all fields
            const formErrors = validateForm(values, validations);
            setErrors(formErrors);

            if (hasErrors(formErrors)) {
                return;
            }

            setIsSubmitting(true);
            try {
                await onSubmit?.(values);
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validations, onSubmit]
    );

    // Set a single field value
    const setFieldValue = useCallback((name: string, value: string) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    // Set a single field error
    const setFieldError = useCallback((name: string, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    // Reset the form
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Get field props (for easier binding)
    const getFieldProps = useCallback(
        (name: string) => ({
            value: values[name] || "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(name, e.target.value),
            onBlur: () => handleBlur(name),
        }),
        [values, handleChange, handleBlur]
    );

    // Get field error (only if touched)
    const getFieldError = useCallback(
        (name: string) => (touched[name] ? errors[name] : undefined),
        [errors, touched]
    );

    // Check if field is touched
    const isFieldTouched = useCallback(
        (name: string) => !!touched[name],
        [touched]
    );

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid: !hasErrors(errors),
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError,
        resetForm,
        getFieldProps,
        getFieldError,
        isFieldTouched,
    };
}
