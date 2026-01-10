import { useState } from "react";
import { Stripe, StripeCardNumberElement, loadStripe } from "@stripe/stripe-js";
import { planData, paymentIntentResponse } from "../types";
import { createPaymentIntent } from "../service/PaymentService";
import { usePersonalSettingForm } from "@/components/account-box/personal-box/hook/usePersonalSettingForm";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateUserInfo, getUserInfo } from "@/components/account-box/personal-box/api/PersonalBoxService";
import type { AccountData } from "@/components/account-box/personal-box/types";
import { getSubscriptionStatus, cancelSubscription } from "../service/PaymentService";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const { userAccount } = usePersonalSettingForm();

    const updateMutation = useMutation({
        mutationFn: (data: Partial<AccountData>) => updateUserInfo(data),
        onSuccess: async () => {
            if (!userAccount) return;
            await getUserInfo(userAccount.id);
            queryClient.invalidateQueries({ queryKey: ['userInfo', userAccount.id] });
        }
    });

    // Fetch subscription info
    const { data: fetchedData } = useQuery({
        queryKey: ['subscriptionInfo', userAccount?.id],
        queryFn: async () => {
            if (!userAccount) throw new Error("User not found");
            // await new Promise(resolve => setTimeout(resolve, 5000));
            return getSubscriptionStatus(userAccount.id);
        },
    });

    const subscriptionInfo = fetchedData;
    console.log("Fetched subscription info:", subscriptionInfo);

    const updateUserSubscriptionStatus = async () => {
        if (!userAccount) return;
        await new Promise(resolve => setTimeout(resolve, 5000));
        const response = (await getSubscriptionStatus(userAccount.id));
        console.log("Subscription status:", response);
        if(response.premium === true) {
            updateMutation.mutate({ isPremium: true });
            // queryClient.invalidateQueries({ queryKey: ['subscriptionInfo', userAccount.id] });
        }
    }

    const downgradeUserSubscriptionStatus = async () => {
        if (!userAccount) return;
        await new Promise(resolve => setTimeout(resolve, 5000));
        const response = (await cancelSubscription(userAccount.id));
        console.log("Subscription status:", response);
        if(response.status === "CANCELLED") {
            updateMutation.mutate({ isPremium: false });
            // queryClient.invalidateQueries({ queryKey: ['subscriptionInfo', userAccount.id] });
        }
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
