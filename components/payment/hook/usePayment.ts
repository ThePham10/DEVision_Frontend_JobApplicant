import { useState } from "react";
import { Stripe, StripeCardNumberElement, loadStripe } from "@stripe/stripe-js";
import { planData, paymentIntentResponse } from "../types";
import { createPaymentIntent } from "../service/PaymentService";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getSubscriptionStatus, cancelSubscription } from "../service/PaymentService";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    // Fetch subscription info
    const { data: fetchedData } = useQuery({
        queryKey: ['subscriptionInfo', user?.id],
        queryFn: async () => {
            if (!user) throw new Error("User not found");
            await new Promise(resolve => setTimeout(resolve, 5000));
            return getSubscriptionStatus(user.id);
        },
    });

    const subscriptionInfo = fetchedData;

    const updateUserSubscriptionStatus = async () => {
        if (!user) return;
        await new Promise(resolve => setTimeout(resolve, 5000));
        await getSubscriptionStatus(user.id);
        await new Promise(resolve => setTimeout(resolve, 3000));
        queryClient.invalidateQueries({ queryKey: ['subscriptionInfo', user.id] });
        queryClient.invalidateQueries({ queryKey: ['userProfile', user.id] });
        toast.success("Subscription upgraded successfully");
    }

    const downgradeUserSubscriptionStatus = async () => {
        if (!user) return;
        await new Promise(resolve => setTimeout(resolve, 5000));
        await cancelSubscription(user.id);
        await new Promise(resolve => setTimeout(resolve, 3000));
        queryClient.invalidateQueries({ queryKey: ['subscriptionInfo', user.id] });
        queryClient.invalidateQueries({ queryKey: ['userProfile', user.id] });
        toast.success("Subscription downgraded successfully");
    }

    const paymentProcess = async (
        stripe: Stripe,
        cardElement: StripeCardNumberElement,
        planData: planData
    ) => {
        if (!stripe || !cardElement) {
            setError("Stripe has not loaded properly.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // create payment intent on the backend
            const intent: paymentIntentResponse = await createPaymentIntent(planData);
            const clientSecret = intent.clientSecret;

            if (!clientSecret) {
                throw new Error("Failed to create/retrieve client secret.");
            }

            // confirm card payment with stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            if (paymentIntent.status === "succeeded") {
                setSuccess(true);
                toast.success("Payment successful");
                return { success: true, paymentIntent };
            }

            return { success: false, paymentIntent };
        } catch (err: any) {
            console.error("Payment failed", err);
            setError(err.message || "Payment failed");
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        stripePromise,
        loading,
        error,
        success,
        paymentProcess,
        setError,
        updateUserSubscriptionStatus,
        downgradeUserSubscriptionStatus,
        subscriptionInfo,
    };
};
