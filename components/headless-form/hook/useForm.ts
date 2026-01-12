import { useState, useCallback } from "react";
import { ValidationErrors, FormValues, FormFieldValue, UseFormOptions, UseFormReturn } from "../types/types"
import { 
    validateField, 
    validateForm, 
    hasErrors, 
} from "./validation";

/**
 * The headless form hook which is use to handle the field validation and form submission
 * @param initialValues - The initial values of the form
 * @param validations - The validation rules for the form that contains all the validation rules for each field
 * @param onSubmit - The callback function to be called when the form is submitted
 * @param validateOnChange - Whether to validate the form on value change
 * @param validateOnBlur - Whether to validate the form on blur
 */
export function useForm({
    initialValues = {},
    validations = {},
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
}: UseFormOptions = {}): UseFormReturn {
    // State variables
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate a single field
    const validateSingleField = useCallback(
        (name: string, value: FormFieldValue, currentValues: FormValues) => {
            const validation = validations[name];
            if (!validation) return null;
            return validateField(value, validation, currentValues);
        },
        [validations]
    );

    // Handle value change (supports string, string[], File, or null)
    // useCallback to prevent re-render function on every render
    // The function is only re-render when the dependencies change which can affect the function behavior
    const handleChange = useCallback(
        (name: string, value: FormFieldValue) => {
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

    // Handle file change
    // useCallback to prevent re-render function on every render
    const handleFileChange = useCallback(
        (name: string, file: File | null) => {
            setValues(prev => ({ ...prev, [name]: file }));
            // Mark as touched when file is selected
            setTouched(prev => ({ ...prev, [name]: true }));
        },
        []
    );

    // Handle blur
    // useCallback to prevent re-render function on every render
    const handleBlur = useCallback(
        (name: string) => {
            setTouched(prev => ({ ...prev, [name]: true }));

            if (validateOnBlur) {
                const value = values[name] ?? "";
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
    // useCallback to prevent re-render function on every render
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
    // useCallback to prevent re-render function on every render
    const setFieldValue = useCallback((name: string, value: string) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    // Set a single field error
    // useCallback to prevent re-render function on every render
    const setFieldError = useCallback((name: string, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    // Reset the form
    // useCallback to prevent re-render function on every render
    // the reset function is only re-render when the initial values change which can affect the correctness of the function
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Get field props (for easier binding - for string fields only)
    // useCallback to prevent re-render function on every render
    // the getFieldProps function is only re-render when the values, handleChange, or handleBlur change which can affect the correctness of the function
    const getFieldProps = useCallback(
        (name: string) => ({
            value: String(values[name] || ""),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(name, e.target.value),
            onBlur: () => handleBlur(name),
        }),
        [values, handleChange, handleBlur]
    );

    // Get field error (only if touched)
    // useCallback to prevent re-render function on every render
    // the getFieldError function is only re-render when the errors or touched change which can affect the correctness of the function
    const getFieldError = useCallback(
        (name: string) => (touched[name] ? errors[name] : undefined),
        [errors, touched]
    );

    // Check if field is touched
    // useCallback to prevent re-render function on every render
    // the isFieldTouched function is only re-render when the touched change which can affect the correctness of the function
    const isFieldTouched = useCallback(
        (name: string) => touched[name],
        [touched]
    );

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid: !hasErrors(errors),
        handleChange,
        handleFileChange,
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

