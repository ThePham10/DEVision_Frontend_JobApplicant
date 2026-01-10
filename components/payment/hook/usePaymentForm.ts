import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { usePayment } from "./usePayment";
import { usePersonalSettingForm } from "@/components/account-box/personal-box/hook/usePersonalSettingForm";

export function usePaymentForm(
    planType: string = "PREMIUM", 
    currency: string = "USD",   
    setIsModalOpen: (isOpen: boolean) => void,
) {
    const stripe = useStripe();
    const elements = useElements();
    const { loading, paymentProcess, updateUserSubscriptionStatus } = usePayment();
    const { userAccount } = usePersonalSettingForm();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) return;
        const planData = {
            applicantId: userAccount?.id,
            payerEmail: userAccount?.email,
            planType,
            currency,
        };
        const result = await paymentProcess(stripe, cardNumberElement, planData);
        if (result?.success) {
            await updateUserSubscriptionStatus();
            setIsModalOpen(false);
        }
    };

    return {
        stripe,
        elements,
        loading,
        handleSubmit,
        userAccount,
    };
}
