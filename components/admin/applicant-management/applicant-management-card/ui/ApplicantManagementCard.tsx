"use client";

import { ApplicantAccount } from "../../types"
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ApplicantManagementCardProps {
    applicant: ApplicantAccount;
    onDeactivate: (applicant: ApplicantAccount) => void;
    onActivate: (applicant: ApplicantAccount) => void;
}

export default function ApplicantManagementCard({ applicant, onDeactivate, onActivate }: ApplicantManagementCardProps) {
    return (
        <motion.div
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            <div className="flex items-center gap-4">
                {/* Name and Description */}
                <div>
                    <div className="font-[Inter] font-semibold text-gray-900 mb-2">
                        {applicant.name}
                    </div>
                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Email: {applicant.email}
                    </div>

                    {applicant.phone && ( <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Phone: {applicant.phone}
                    </div>)}

                    {applicant.address && ( <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Address: {applicant.address}
                    </div>)}

                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Created at: {new Date(applicant.createdAt).toLocaleString()}
                    </div>

                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Updated at: {new Date(applicant.updatedAt).toLocaleString()}
                    </div>

                    <div className="font-[Inter] text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <span>Subscription Status: </span>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium 
                            ${ applicant.isPremium 
                                ? "bg-yellow-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}>
                            {applicant.isPremium ? "Premium" : "Free"}
                        </div>
                    </div>
                
                    <div className="font-[Inter] text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <span>Account Status: </span>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium 
                            ${ applicant.isActive 
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-600"
                            }`}>
                            {applicant.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>

            <div className="flex items-center gap-2">
                {!applicant.isActive && <motion.button
                    onClick={() => onActivate(applicant)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-[Inter]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Activate"
                >
                    <Check />
                </motion.button>}

                {applicant.isActive && <motion.button
                    onClick={() => onDeactivate(applicant)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-[Inter]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Deactivate"
                >
                    <X />
                </motion.button>}
            </div>
        </motion.div>
    );
}
