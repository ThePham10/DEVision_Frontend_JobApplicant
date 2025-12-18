import { HeadlessForm } from "@/components/headless-form/Form";
import type { FormConfig } from "@/components/headless-form/types/types";

const formConfig: FormConfig = {
    children: [
        { name: "current", title: "Current Password", type: "password", placeholder: "Current Password", colSpan: 1 },
        { name: "new", title: "New Password", type: "password", placeholder: "New Password", colSpan: 1 },
        { name: "confirm", title: "Confirm Password", type: "password", placeholder: "Confirm Password", colSpan: 1 },
    ],
    buttonText: "Save Changes",
    layout: {
        type: "grid",
        columns: 4,
        gap: "6",
    },
};

export const ChangePasswordForm = () => {
    return (
        <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)} />
    );
};
