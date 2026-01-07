import { commonValidations, FormValues, FormConfig } from "@/components/headless-form";
import registerUser from "../service/RegisterFormService";
import { useRouter } from "next/navigation";


export const useRegisterForm = () => {
    const router = useRouter();

    const formConfig : FormConfig = {
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
                placeholder: "+84 912345678",
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
        buttonText: "Register",
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },
        buttonClassName: "col-span-2"
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            // Prepare data for registration (exclude confirmPassword)
            const registerData = {
                name: values.name as string,
                email: values.email as string,
                password: values.password as string,
                country: values.country as string,
                phone: values.phone as string,
                street: values.street as string,
                city: values.city as string,
            };

            const response = await registerUser(registerData);
            if (response.success) {
                router.push("/verify-email");
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