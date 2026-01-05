"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "./Button";

interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    isPopular?: boolean;
    onSelect: () => void;
    ctaText: string;
    highlighted?: boolean;
    isCurrent?: boolean;
}

export const PricingCard = ({
    title,
    price,
    period,
    features,
    isPopular = false,
    onSelect,
    ctaText,
    highlighted = false,
    isCurrent = false,
}: PricingCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                highlighted
                    ? "border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 shadow-xl scale-105"
                    : "border-gray-200 bg-white shadow-md hover:shadow-lg"
            }`}
        >
            {/* Popular badge */}
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                        Most Popular
                    </span>
                </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

            {/* Price */}
            <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{price}</span>
                <span className="text-gray-500 text-lg ml-2">{period}</span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                            <Check size={20} className="text-amber-600" strokeWidth={2.5} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>


            {/* CTA Button */}
            <Button 
                text={ctaText}
                onClick={onSelect}
                style="w-full"
                disabled={isCurrent}
            />
        </motion.div>
    );
};
