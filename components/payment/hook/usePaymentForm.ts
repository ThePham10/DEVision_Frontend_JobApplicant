import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { usePayment } from "./usePayment";
import { useAuthStore } from "@/store";

export function usePaymentForm(
    planType: string = "PREMIUM",  
    currency: string = "USD",  
    setIsModalOpen: (isOpen: boolean) => void,
) {
    // Initialize Stripe instance and Elements hooks
    const stripe = useStripe();
    const elements = useElements();
    const { loading, paymentProcess, updateUserSubscriptionStatus } = usePayment();
    const { user } = useAuthStore();

    const handleSubmit = async (event: React.FormEvent) => {
        // Prevent the browser from reloading
        event.preventDefault();
        if (!stripe || !elements) return;

        // Get the card element from Stripe Elements
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) return;
        const planData = {
            applicantId: user?.id,
            payerEmail: user?.email,
            planType,
            currency,
        };

        // Process the payment
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
    };
}
