import { InputHTMLAttributes } from "react";

// Define the phone number input field props
interface PhoneNumberInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    title? : string,
    name? : string,
    selectedDialCode? : string,
    fieldError? : string,
    placeholder? : string,
    value? : string,
    onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void,
    onBlur? : (event : React.FocusEvent<HTMLInputElement>) => void,
}

/**
 * PhoneNumberInputField component
 * @param title - The title of the phone number input field
 * @param name - The name of the phone number input field
 * @param selectedDialCode - The selected dial code for the phone number input field
 * @param fieldError - The error message for the phone number input field
 * @param placeholder - The placeholder for the phone number input field
 * @param value - The value of the phone number input field
 * @param onChange - The function to be called when the phone number input field value changes
 * @param onBlur - The function to be called when the phone number input field loses focus
 */
const PhoneNumberInputField  = ({title, name, selectedDialCode, fieldError, placeholder, value, onChange, onBlur} : PhoneNumberInputFieldProps) => {
    return (
        <div className="mb-4">
            {/*Title*/}
            <label className="block font-[Inter] text-[#0F1729] mb-2">
                {title}
            </label>
            {/*Phone number input field*/}
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
                    name={name}
                    placeholder={selectedDialCode ? "Enter phone number" : placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
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
    )
}

export default PhoneNumberInputField;