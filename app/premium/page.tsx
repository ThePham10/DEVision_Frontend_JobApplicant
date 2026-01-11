"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Crown, Zap, Bell, Shield, Sparkles, Check, X } from "lucide-react";
import { PricingCard, AuthGuard } from "@/components/reusable-component";
import PaymentCheckoutModal from "@/components/payment/ui/PaymentCheckoutModal";
import { Modal } from "@/components/reusable-component/Modal";
import { usePersonalSettingForm } from "@/components/account-box/personal-box/hook/usePersonalSettingForm";
import { planType } from "@/components/payment/types";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { usePayment } from "@/components/payment/hook/usePayment";
import CancelConfirmModal from "@/components/payment/ui/CancelConfirmModal";
import { useAuthStore } from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Page() {
    const [selectedPlan, setSelectedPlan] = useState<planType>();
    const { subscriptionInfo } = usePayment();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDowngradeModalOpen, setIsDowngradeModalOpen] = useState(false);

    const { userProfile } = useAuthStore();

    const pricingPlans = [
        {
            title: "FREE",
            price: "$0",
            period: "/month",
            features: [
                "Basic job search",
                "Email notifications",
                "Profile creation",
                "Apply to unlimited jobs",
            ],
            ctaText: userProfile?.isPremium === false ? "Current Plan" : "Downgrade to Free",
            onSelect: () => setSelectedPlan("FREE"),
            highlighted: false,
            isCurrent: userProfile?.isPremium === false ? true : false,
        },
        {
            title: "PREMIUM",
            price: "$10",
            period: "/month",
            features: [
                "Everything in Free",
                "Real-time job alerts",
                "Premium support",
                "Early access to new features"
            ],
            ctaText: userProfile?.isPremium === true ? "Current Plan" + (subscriptionInfo ? ` (Ends on ${subscriptionInfo.endDate})` : "") : "Upgrade Now",
            onSelect: () => setSelectedPlan("PREMIUM"),
            highlighted: true,
            isCurrent: userProfile?.isPremium === true ? true : false,
            isPopular: true,
        },
    ];

    const comparisonFeatures = [
        { feature: "Job Search Access", free: true, premium: true },
        { feature: "Email Notifications", free: true, premium: true },
        { feature: "Real-time Job Alerts", free: false, premium: true },
        { feature: "Support", free: "Community", premium: "Priority" }
    ];

    const benefits = [
        {
            icon: Bell,
            title: "Real-time Job Alerts",
            description: "Get instant notifications when jobs matching your criteria are posted"
        },
        {
            icon: Sparkles,
            title: "Unlimited Saved Jobs",
            description: "Save as many job listings as you want to review and apply later"
        },
        {
            icon: Shield,
            title: "Premium Support",
            description: "Get priority assistance from our support team whenever you need help"
        },
        {
            icon: Zap,
            title: "Early Access to Features",
            description: "Be the first to try new features and tools before they're publicly available"
        }
    ];

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white font-[Inter]">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6 lg:px-8">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
                    </div>

                    <div className="relative max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles size={16} />
                            <span className="text-sm font-medium">Unlock Premium Features</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Accelerate Your{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                Career Journey
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                        >
                            Get priority access to job opportunities, advanced analytics, and exclusive career resources with DEVision Premium.
                        </motion.p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Why Choose Premium?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl mb-4">
                                        <benefit.icon className="text-amber-600" size={28} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                Choose Your Plan
                            </h2>
                            <p className="text-lg text-gray-600">
                                Upgrade to premium and unlock advanced features
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {pricingPlans.map((plan, index) => (
                                <PricingCard
                                    key={index}
                                    {...plan}
                                    onSelect={() => {
                                        if (plan.title === "PREMIUM") {
                                            setIsModalOpen(true);
                                            setSelectedPlan("PREMIUM");
                                        } else if (plan.title === "FREE") {
                                            setIsDowngradeModalOpen(true);
                                            setSelectedPlan("FREE");
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {selectedPlan === "PREMIUM" && (
                    <Elements stripe={stripePromise}>
                        <PaymentCheckoutModal 
                            planType="PREMIUM" 
                            currency="USD" 
                            setIsModalOpen={setIsModalOpen}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        /> 
                    </Elements>  
                )}

                {selectedPlan === "FREE" && (
                    <CancelConfirmModal
                        isOpen={isDowngradeModalOpen}
                        onClose={() => setIsDowngradeModalOpen(false)}
                    />
                )}

                {/* Feature Comparison */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Feature Comparison
                        </h2>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Feature
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                            Free
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-amber-900 bg-amber-50">
                                            <div className="flex items-center justify-center gap-2">
                                                <Crown size={18} />
                                                Premium
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {comparisonFeatures.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {item.feature}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {typeof item.free === "boolean" ? (
                                                    item.free ? (
                                                        <Check className="inline text-green-600" size={20} strokeWidth={2.5} />
                                                    ) : (
                                                        <X className="inline text-gray-300" size={20} strokeWidth={2.5} />
                                                    )
                                                ) : (
                                                    <span className="text-sm text-gray-600">{item.free}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center bg-amber-50/50">
                                                {typeof item.premium === "boolean" ? (
                                                    item.premium ? (
                                                        <Check className="inline text-amber-600" size={20} strokeWidth={2.5} />
                                                    ) : (
                                                        <X className="inline text-gray-300" size={20} strokeWidth={2.5} />
                                                    )
                                                ) : (
                                                    <span className="text-sm font-medium text-amber-900">{item.premium}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Can I cancel anytime?
                                </h3>
                                <p className="text-gray-600">
                                    Yes! You can cancel your premium subscription at any time. You&apos;ll continue to have access until the end of your billing period.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-gray-600">
                                    We accept all major credit cards, PayPal, and other secure payment methods through our payment processor.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {userProfile?.isPremium === false && (
                    // Final CTA
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-yellow-50">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Crown className="inline-block text-amber-600 mb-6" size={48} strokeWidth={2} />
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Ready to Level Up Your Career?
                                </h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Join thousands of professionals who&apos;ve accelerated their job search with DEVision Premium.
                                </p>
                                <motion.button
                                    onClick={() => setSelectedPlan("PREMIUM")}
                                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Upgrade Now
                                </motion.button>
                            </motion.div>
                        </div>
                    </section>
                )}

                {userProfile?.isPremium === true && (
                    // Final CTA
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-yellow-50">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Crown className="inline-block text-amber-600 mb-6" size={48} strokeWidth={2} />
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    You are a Premium Member!
                                </h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Thank you for being a valued DEVision Premium subscriber.
                                </p>
                            </motion.div>
                        </div>
                    </section>
                )}
            </div>
        </AuthGuard>
    );
}
