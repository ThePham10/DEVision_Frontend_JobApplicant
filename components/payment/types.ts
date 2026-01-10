type planData = {
    applicantId?: string;
    payerEmail?: string;
    planType: string;
    currency: string;
}

type paymentIntentResponse = {
    clientSecret: string;
    stripeSubscriptionId: string;
    stripePaymentIntentId: string;
    transactionId: string;
}

type subscriptionResponse = {
    userId: string;
    premium: boolean;
    subscriptionStatus: string;
    endDate: string;
}

type cancelSubscriptionResponse = {
    subscriptionId: string,
    status: string,
    startDate: string,
    endDate: string;
}

type planType = "FREE" | "PREMIUM";

export type { planData, paymentIntentResponse, planType, subscriptionResponse, cancelSubscriptionResponse };