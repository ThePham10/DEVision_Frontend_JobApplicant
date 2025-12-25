"use client";

import { Company } from "../types";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Modal from "@/components/reusable-component/Modal";
import { useState } from "react";
import CompanyDetails from "./CompanyDetails";
import { Building2 } from "lucide-react";

interface CompanyManagementCardProps {
    company: Company;
    onDeactivate: (company: Company) => void;
    onActivate: (company: Company) => void;
}

export default function CompanyManagementCard({ company, onDeactivate, onActivate }: CompanyManagementCardProps) {
    const [isModalOpen, setIsModalOpen] =  useState(false);

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
                    <div className="font-[Inter] font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Building2 className="flex-shrink-0" />
                        <span>{company.name}</span>
                    </div>
                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Email: {company.email}
                    </div>

                    {company.address && ( <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Address: {company.address}
                    </div>)}

                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Established on: {new Date(company.createdAt).toLocaleDateString()}
                    </div>

                    <div className="font-[Inter] text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <span>Company Status: </span>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium 
                            ${company.isActive 
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-600"
                            }`}>
                            {company.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <div className="flex items-center gap-2">
                <motion.button 
                    onClick={() => setIsModalOpen(true)} 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-[Inter]" 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                >   
                    View Details
                </motion.button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={company.name}
                    size="large"
                >
                    {company && (<CompanyDetails company={company} /> )}
                </Modal>

                {!company.isActive && <motion.button
                    onClick={() => onActivate(company)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-[Inter]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Activate"
                >
                    <Check />
                </motion.button>}

                {company.isActive && <motion.button
                    onClick={() => onDeactivate(company)}
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