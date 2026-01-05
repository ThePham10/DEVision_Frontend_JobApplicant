import { HeadlessForm } from "@/components/headless-form/Form";
import type { FormConfig } from "@/components/headless-form/types/types";
import { useAuthStore } from "@/store/authStore";

export const PersonalBoxForm = () => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "phone", title: "Phone number", type: "tel", placeholder: "", colSpan: 2 },
            { name: "street", title: "Address", type: "text", placeholder: "", colSpan: 1 },
            { name: "city", title: "City", type: "text", placeholder: "", colSpan: 1 },
            { name: "country", title: "Country", type: "country", placeholder: "", colSpan: 2 },
        ],
        buttonText: "Save Changes",
        buttonClassName: "col-span-2",
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },
    };  

    return (
        <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)}/>
    )
}
