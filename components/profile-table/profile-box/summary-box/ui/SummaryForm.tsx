import { HeadlessForm, FormConfig } from "@/components/headless-form";
import { useAuthStore } from "@/store/authStore";

export const SummaryForm = () => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "summary", title: "Summary", type: "text", placeholder: "Write a brief summary about your career objectives...", colSpan: 1 },
        ],
        buttonText: "Save",
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