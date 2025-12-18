import { HeadlessForm } from "@/components/headless-form/Form";
import type { FormConfig } from "@/components/headless-form/types/types";
import { useAuthStore } from "@/store/authStore";

export const PersonalBoxForm = () => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "name", title: "Name", type: "text", placeholder: user.name, colSpan: 1 },
            { name: "email", title: "Email", type: "text", placeholder: user.email, colSpan: 1 },
            { name: "country", title: "Country", type: "text", placeholder: user.country, colSpan: 1 },
        ],
        buttonText: "Save Changes",
        layout: {
            type: "grid",
            columns: 4,
            gap: "6",
        },
    };  

    return (
        <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)}/>
    )
}
