import { HeadlessForm } from "@/components/headless-form/ui/Form";
import { useChangePasswordForm } from "./hook/useChangePasswordForm";

export const ChangePasswordForm = () => {
    const { handleSubmit, formConfig } = useChangePasswordForm();

    return (
        <HeadlessForm config={formConfig} onSubmit={handleSubmit} />
    );
};
