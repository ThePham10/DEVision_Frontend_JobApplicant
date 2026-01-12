import { PAYMENT_CREATE_INTENT_URL, PAYMENT_GET_SUBSCRIPTION_URL, PAYMENT_CANCEL_SUBSCRIPTION_URL } from "@/config/URLConfig";
import { planData, paymentIntentResponse, subscriptionResponse, cancelSubscriptionResponse } from "../types";
import { jmHttpHelper } from "@/utils/jmhttpHelper";

/**
* Function to create a payment intent
* @param - plan data for the payment
* @returns - payment intent including client secret response from API
*/
export const createPaymentIntent = async (planData: planData): Promise<paymentIntentResponse> => {
    const response = await jmHttpHelper.post(PAYMENT_CREATE_INTENT_URL, planData);
    return response.data as paymentIntentResponse;
};

/**
* Function to get the subscription status of an applicant
* @param - applicant ID
* @returns - subscription response from API
*/
export const getSubscriptionStatus = async (applicantId: string): Promise<subscriptionResponse> => {
    const response = await jmHttpHelper.get(`${PAYMENT_GET_SUBSCRIPTION_URL}/${applicantId}`);
    return response.data as subscriptionResponse;
}

/**
* Function to cancel the subscription of an applicant
* @param - applicant ID
* @returns - cancel subscription response from API
*/
export const cancelSubscription = async (applicantId: string): Promise<cancelSubscriptionResponse> => {
    const response = await jmHttpHelper.post(`${PAYMENT_CANCEL_SUBSCRIPTION_URL}/${applicantId}/cancel`, {});
    return response.data as cancelSubscriptionResponse;
}
