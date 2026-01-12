"use client";

import { Company } from "../types";
import { motion } from "framer-motion";
import { Modal } from "@/components/reusable-component/Modal";
import { useState } from "react";
import CompanyDetails from "./CompanyDetails";
import { Building2, X } from "lucide-react";

interface CompanyManagementCardProps {
    company: Company;
    onDelete: (company: Company) => void;
}

export default function CompanyManagementCard({ company, onDelete }: CompanyManagementCardProps) {
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
                        <span>{company.companyName}</span>
                    </div>
                    <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                        Email: {company.email}
                    </div>

                    {company.createdAt && (
                        <div className="font-[Inter] text-sm text-gray-500 max-w-md truncate mb-2">
                            Established on: {new Date(company.createdAt).toLocaleDateString()}
                        </div>
                    )}
                    
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

                <motion.button
                    onClick={() => onDelete(company)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-[Inter]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete"
                >
                    <X />
                </motion.button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={company.companyName}
                    size="large"
                >
                    {company && (
                    <CompanyDetails 
                        company={company} 
                        onClose={() => setIsModalOpen(false)}
                    /> )}
                </Modal>
            </div>
        </motion.div>
    );
}