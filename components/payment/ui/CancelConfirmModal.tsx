"use client"

import { Modal } from "@/components/reusable-component/Modal";
import { usePayment } from "../hook/usePayment";

interface CancelConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CancelConfirmModal({
    isOpen,
    onClose,
}: CancelConfirmModalProps) {
    const { downgradeUserSubscriptionStatus } = usePayment();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="medium"
            >
                {/* Confirmation Content */}
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Downgrade to Free Plan</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to downgrade to the Free plan? You will lose access to premium features.
                    </p>
                    <button
                        onClick={() => {
                            downgradeUserSubscriptionStatus();
                            onClose();
                        }}
                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
                    >
                        Confirm Downgrade
                    </button>
                    <button
                        onClick={() => onClose()}
                        className="ml-4 bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}