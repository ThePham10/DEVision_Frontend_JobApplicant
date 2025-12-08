"use client";

import { useState, InputHTMLAttributes, ReactNode } from "react";

// Variant styles
type InputVariant = "outlined" | "filled";

// Size options
type InputSize = "sm" | "md" | "lg";

// Validation state
type InputState = "default" | "error" | "success";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    // Label
    title?: string;
    
    // Customization
    variant?: InputVariant;
    size?: InputSize;
    state?: InputState;
    
    // Icons
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    
    // Helpers
    helperText?: string;
    errorMessage?: string;
    successMessage?: string;
    
    // Custom styling
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
}

// Size configurations
const sizeStyles: Record<InputSize, { input: string; icon: string }> = {
    sm: { input: "h-[32px] text-sm px-2", icon: "h-4 w-4" },
    md: { input: "h-[40px] text-base px-3", icon: "h-5 w-5" },
    lg: { input: "h-[48px] text-lg px-4", icon: "h-6 w-6" },
};

// Variant configurations
const variantStyles: Record<InputVariant, string> = {
    outlined: "bg-white border border-[#E1E7EF]",
    filled: "bg-[#F8FAFC] border border-transparent",
};

// State configurations
const stateStyles: Record<InputState, { border: string; ring: string; text: string }> = {
    default: {
        border: "focus:border-[#6366F1]",
        ring: "focus:ring-[#6366F1]/20",
        text: "text-gray-500",
    },
    error: {
        border: "border-red-500 focus:border-red-500",
        ring: "focus:ring-red-500/20",
        text: "text-red-500",
    },
    success: {
        border: "border-green-500 focus:border-green-500",
        ring: "focus:ring-green-500/20",
        text: "text-green-500",
    },
};

export default function Input({
    title,
    type = "text",
    placeholder,
    variant = "outlined",
    size = "md",
    state = "default",
    leftIcon,
    rightIcon,
    helperText,
    errorMessage,
    successMessage,
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    disabled,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    
    // Determine current state based on messages
    const currentState = errorMessage ? "error" : successMessage ? "success" : state;
    
    // Get style configurations
    const sizeConfig = sizeStyles[size];
    const variantConfig = variantStyles[variant];
    const stateConfig = stateStyles[currentState];
    
    // Calculate padding based on icons
    const paddingLeft = leftIcon ? "pl-10" : "";
    const paddingRight = rightIcon || isPasswordField ? "pr-10" : "";
    
    // Helper message to display
    const displayMessage = errorMessage || successMessage || helperText;

    return (
        <div className={`mb-4 ${containerClassName}`}>
            {title && (
                <label 
                    className={`block font-[Inter] text-[#0F1729] mb-2 ${labelClassName}`} 
                    htmlFor={props.id || title}
                >
                    {title}
                </label>
            )}
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${stateConfig.text} ${sizeConfig.icon}`}>
                        {leftIcon}
                    </span>
                )}
                
                {/* Input Field */}
                <input
                    id={props.id || title}
                    type={isPasswordField && showPassword ? "text" : type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        w-full rounded font-[Inter] text-gray-700 leading-tight
                        transition-all duration-200
                        focus:outline-none focus:ring-2
                        ${sizeConfig.input}
                        ${variantConfig}
                        ${stateConfig.border}
                        ${stateConfig.ring}
                        ${paddingLeft}
                        ${paddingRight}
                        ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}
                        ${inputClassName}
                    `}
                    {...props}
                />
                
                {/* Right Icon or Password Toggle */}
                {(rightIcon || isPasswordField) && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isPasswordField ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`${stateConfig.text} hover:text-[#6366F1] transition-colors duration-200`}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className={sizeConfig.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className={sizeConfig.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        ) : (
                            <span className={`${stateConfig.text} ${sizeConfig.icon}`}>
                                {rightIcon}
                            </span>
                        )}
                    </span>
                )}
            </div>
            
            {/* Helper/Error/Success Message */}
            {displayMessage && (
                <p className={`mt-1 text-sm ${stateConfig.text}`}>
                    {displayMessage}
                </p>
            )}
        </div>
    );
}

// Re-export types for external use
export type { InputProps, InputVariant, InputSize, InputState };