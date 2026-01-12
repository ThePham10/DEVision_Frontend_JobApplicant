type SelectOption = {
    id: string;
    name: string;
    value?: string;
    icon?: string;
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
    multiple?: boolean;  // For multi-select dropdowns
    // Range slider properties
    min?: number;
    max?: number;
    step?: number;
    formatValue?: (value: number) => string;  // Custom value formatter (e.g., for currency)
    // Country dropdown return type
    returnType?: "value" | "label" | "object";  // What to return: code, name, or full object
}

type FormConfig = {
    className?: string;
    children: FormChild[];
    buttonText: string;
    phoneFieldName?: string;
    layout?: {
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
    handleChange: (name: string, value: FormFieldValue) => void;
    handleFileChange: (name: string, file: File | null) => void;
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

type ValidationRule = {
    validate: (value: FormFieldValue, allValues?: FormValues) => boolean;
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

// FormFieldValue can be a string (text inputs), string[] (tags/multi-checkbox), or File (file inputs)
export type FormFieldValue = string | string[] | File | null;

export type FormValues = Record<string, FormFieldValue>;

export type { FormChild, FormConfig, HeadlessFormProps, UseFormOptions, UseFormReturn, ValidationRule, FieldValidation, SelectOption };