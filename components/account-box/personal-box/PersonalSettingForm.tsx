import { HeadlessForm } from "@/components/headless-form/Form";
import type { FormConfig } from "@/components/headless-form/types/types";

const formConfig: FormConfig = {
    children: [
        { name: "name", title: "Name", type: "text", placeholder: "John Doe", colSpan: 1 },
        { name: "email", title: "Email", type: "text", placeholder: "john.doe@example.com", colSpan: 1 },
        { name: "phone", title: "Phone Number", type: "text", placeholder: "+1 234 567 890", colSpan: 1 },
    ],
    buttonText: "Save Changes",
    layout: {
        type: "grid",
        columns: 4,
        gap: "6",
    },
};  

export const PersonalBoxForm = () => {
    return (
        <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)}/>
    )
}
