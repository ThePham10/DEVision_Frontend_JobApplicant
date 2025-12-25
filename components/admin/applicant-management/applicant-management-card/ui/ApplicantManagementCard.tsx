"use client";

import { ApplicantAccount } from "../../types";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

interface ApplicantManagementCardProps {
    applicant: ApplicantAccount;
    onDelete: (applicant: ApplicantAccount) => void;
}

export default function ApplicantManagementCard({ applicant, onDelete }: ApplicantManagementCardProps) {
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
                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Phone: {applicant.phone}
                    </div>
                
                    <div className="font-[Inter] text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <span>Email Verified: </span>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium 
                            ${ applicant.emailVerified 
                                ? "bg-green-100 text-green-700" 
                                : "bg-gray-200 text-gray-600"
                            }`}>
                            {applicant.emailVerified ? "Verified" : "Not Verified"}
                        </div>
                    </div>
                    

                    <div className="font-[Inter] text-sm text-gray-500 mt-2 mb-1 flex items-center gap-2">
                        <span>Subscription: </span>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium 
                        ${ applicant.subscription 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                            {applicant.subscription ? "Active" : "Inactive"}
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <div className="flex items-center gap-2">
                <motion.button
                    onClick={() => onDelete(applicant)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete applicant"
                >
                    <FaTrash size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}
