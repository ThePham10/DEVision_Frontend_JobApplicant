import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import changePassword from "../api/ChangePasswordService";
import type { FormValues } from "@/components/headless-form/types/types";
import type { FormConfig } from "@/components/headless-form/types/types";
import { commonValidations } from "@/components/headless-form/ui/Form";
import toast from "react-hot-toast";


export const useChangePasswordForm = () => {
    const { clearUser } = useAuthStore();
    const router = useRouter();

    // Define the form configuration for changing password
    const formConfig: FormConfig = {
        children: [
            { 
                name: "current", 
                title: "Current Password", 
                type: "password", 
                placeholder: "***************",
                colSpan: 1, 
                validation: commonValidations.password
            },
            { 
                name: "new", 
                title: "New Password", 
                type: "newPassword", 
                placeholder: "***************",
                colSpan: 1, 
                validation: commonValidations.password
            },
            {
                name: "confirm",
                title: "Confirm Password",
                type: "confirmPassword",
                placeholder: "***************",
                validation: {
                    required: true,
                    requiredMessage: "Please confirm your password",
                    match: "new",
                    matchMessage: "Passwords do not match",
                },
                colSpan: 1
            },
        ],
        buttonText: "Save Changes",
        layout: {
            type: "grid",
            columns: 4,
            gap: "6",
        },
    };

    // Handle change password form submission
    const handleSubmit = async (values: FormValues) => {
        // Validate passwords match
        if (values.new !== values.confirm) {
            alert("New password and confirm password do not match");
            return;
        }

        try {
            // Convert response to match ChangePasswordResult type
            // Send change password request 
            const result = await changePassword({
                currentPassword: values.current as string,
                newPassword: values.new as string,
            });

            // If successful, log out user and redirect to login page
            if (result.success) {
                clearUser();
                toast.success("Password changed successfully. Please log in again.");
                router.replace("/login");
            } else {
                toast.error(result.error || "Failed to change password");
            }
        } catch (error) {
            toast.error("An error occurred while changing password");
        }
    };

    return { 
        handleSubmit,
        formConfig
    };
};
