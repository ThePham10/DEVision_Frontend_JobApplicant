"use client";

import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { BsCreditCard } from "react-icons/bs"; 
import { RiVisaFill } from "react-icons/ri"; 
import { FaCcMastercard } from "react-icons/fa";
import { Modal } from "@/components/reusable-component/Modal";
import { usePaymentForm } from "../hook/usePaymentForm";

interface PaymentCheckoutModalProps {
    planType?: string;
    currency?: string;
    isOpen: boolean;
    onClose: () => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function PaymentCheckoutModal({
    planType = "PREMIUM", 
    currency = "USD",
    isOpen,
    onClose,
    setIsModalOpen,
}: PaymentCheckoutModalProps) {
    const {
        loading,
        handleSubmit,
    } = usePaymentForm(planType, currency, setIsModalOpen);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="large"
            >
                {/* Payment Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-4"
                >
                    {/* LEFT: Subscription Summary */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Subscription fee</p>
                            <p className="text-3xl font-bold text-gray-900">
                                $10.00 <span className="text-base font-medium">per month</span>
                            </p>
                            <p className="text-sm text-gray-500">Premium Applicant Plan · Billed monthly</p>
                        </div>
                        <div className="border-t pt-4 space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>$10.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <div className="border-t pt-4 space-y-2 text-gray-700">
                            <div className="flex justify-between font-semibold text-gray-900">
                                <span>Total due today</span>
                                <span>$10.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Payment method</h3>
                            <label className="block mt-2 text-sm font-medium text-gray-700">Card information</label>
                            <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                                <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
                            </div>
                            {/* Expiry + CVC */}
                            <div className="flex gap-4 mt-4">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Expiry Date</label>
                                    <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                                        <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">CVC</label>
                                    <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                                        <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="ri-lock-line" /> Pay $10.00 

                                </>
                            )}
                        </button>
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <BsCreditCard size={24} />
                            <FaCcMastercard size={24} />
                            <RiVisaFill size={24} />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};
