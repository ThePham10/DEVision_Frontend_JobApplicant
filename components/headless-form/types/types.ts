import { UserCredential } from "firebase/auth";

type SelectOption = {
    label: string;
    value: string;
};

type FormChild = {
    title: string;
    name: string; 
    type: string;
    placeholder: string;
    validation?: FieldValidation;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    colSpan?: number;
    rowSpan?: number;
    options?: SelectOption[];  // For select/dropdown fields
    // Range slider properties
    min?: number;
    max?: number;
    step?: number;
    formatValue?: (value: number) => string;  // Custom value formatter (e.g., for currency)
}

type FormConfig = {
    className?: string;
    children: FormChild[];
    buttonText: string;
    phoneFieldName?: string; 
    layout? : {
        type: "flex" | "grid";
        direction?: "row" | "column";
        columns?: number;
        gap?: string;
        wrap?: boolean;
    };
    formClassName?: string;
    buttonClassName?: string;
}

type HeadlessFormProps = {
    config: FormConfig;
    onSubmit: (values: FormValues) => void | Promise<void>;
    initialValues?: FormValues;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

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
    handleGoogle: (e?: React.FormEvent) => Promise<UserCredential>;
};

type ValidationRule = {
    validate: (value: string, allValues?: Record<string, string>) => boolean;
    message: string;
};

type FieldValidation = {
    required?: boolean;
    requiredMessage?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
    match?: string; // Name of field to match (e.g., "password" for confirmPassword)
    matchMessage?: string;
    custom?: ValidationRule[];
};

export type ValidationErrors = Record<string, string>;

export type FormValues = Record<string, string>;

export type { FormChild, FormConfig, HeadlessFormProps, UseFormOptions, UseFormReturn, ValidationRule, FieldValidation, SelectOption };