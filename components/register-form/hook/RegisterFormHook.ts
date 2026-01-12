import { commonValidations, FormValues, FormConfig } from "@/components/headless-form";
import registerUser from "../service/RegisterFormService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * The register form hook
 */
export const useRegisterForm = () => {
    // The router to redirect to the verify email page
    const router = useRouter();

    // The form configuration with corresponding fields (name, email, password, confirm password, country, phone, street, city) for the register
    const formConfig: FormConfig = {
        className: "flex flex-col items-center bg-white p-8 gap-6 w-full max-w-md rounded shadow",
        children: [
            {
                title: "Name *",
                name: "name",
                type: "text",
                placeholder: "John Doe",
                validation: commonValidations.name,
                colSpan: 2
            },
            {
                title: "Email *",
                name: "email",
                type: "email",
                placeholder: "test@gmail.com",
                validation: commonValidations.email,
                colSpan: 2
            },
            {
                title: "Password *",
                name: "password",
                type: "password",
                placeholder: "***************",
                validation: commonValidations.password,
                colSpan: 1
            },
            {
                title: "Confirm Password *",
                name: "confirmPassword",
                type: "password",
                placeholder: "***************",
                validation: {
                    required: true,
                    requiredMessage: "Please confirm your password",
                    match: "password",
                    matchMessage: "Passwords do not match",
                },
                colSpan: 1
            },
            {
                title: "Country *",
                name: "country",
                type: "country",
                placeholder: "Vietnam",
                validation: {
                    required: true,
                    requiredMessage: "Please select a country",
                },
                colSpan: 1
            },
            {
                title: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "+84912345678",
                validation: commonValidations.phone,
                colSpan: 1
            },
            {
                title: "Street name/number",
                name: "street",
                type: "text",
                placeholder: "123 Main St",
                colSpan: 1
            },
            {
                title: "City",
                name: "city",
                type: "text",
                placeholder: "Ho Chi Minh City",
                colSpan: 1
            },
        ],

        // Define the button text
        buttonText: "Register",

        // Define the form layout with grid type and 2 columns
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },

        // Define the button class name
        buttonClassName: "col-span-2"
    };

    // Function to handle the form submission which call the function in the server for sending the register data
    const handleSubmit = async (values: FormValues) => {
        try {
            // Remove the white space in the phone number
            const submitPhoneNum = (values.phone as string).replace(/\s/g, '');

            // Create the register data object
            const registerData = {
                name: values.name as string,
                email: values.email as string,
                password: values.password as string,
                country: values.country as string,
                phone: submitPhoneNum,
                street: values.street as string,
                city: values.city as string,
            };

            // Call the function in the server for sending the register data
            const response = await registerUser(registerData);

            // Check whether the request is successfull or not and redirect to the verify email page
            if (response.success) {
                toast.success("Registration successful");
                router.push("/verify-email");
            } else {
                toast.error(response.error || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return {
        formConfig,
        handleSubmit
    }
}