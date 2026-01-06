import { HeadlessForm } from "@/components/headless-form/ui/Form";
import type { FormConfig } from "@/components/headless-form/types/types";
import { useAuthStore } from "@/store/authStore";
import { FormValues } from "@/components/headless-form/types/types";
import { getUserInfo, updateUserInfo } from "../personal-box/api/PersonalBoxService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PersonalBoxForm = () => {
    const { isAuthenticated, user, setUser } = useAuthStore();
    const [formKey, setFormKey] = useState(0);
    
    const { mutate: updateUser } = useMutation({
        mutationFn: (data: any) => updateUserInfo(data),
        onSuccess: async () => {
            if (!user) return;
            const response = await getUserInfo(user.id);
            if (response.status === 200) {
                const updatedUser = response.data.user || response.data;
                if (updatedUser) {
                    setUser(updatedUser);
                    setFormKey(prev => prev + 1);
                }
            }
        },
    });

    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "name", title: "Name", type: "text", placeholder: user.name, colSpan: 1 },
            { name: "email", title: "Email", type: "text", placeholder: user.email, colSpan: 1 },
            { name: "country", title: "Country", type: "text", placeholder: user.country ?? "", colSpan: 1 },
        ],
        buttonText: "Save Changes",
        buttonClassName: "col-span-2",
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },
    };  

    const handleSubmit = async (values: FormValues) => {
        try {
            const updatedData = {
                name: values.name as string,
                
            };
            // Use mutation instead of direct API call
            updateUser(updatedData);
        } catch (err) {
            console.error("Login error:", err);
        }
    }

    return (
        <HeadlessForm key={formKey} config={formConfig} onSubmit={handleSubmit}/>
    )
}
