"use client";

import { SummaryForm } from "../SummaryForm";

export const SummaryTable = () => {
    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-6">
                <div className="font-[Inter] text-3xl font-bold mb-4">
                    Objective Summary
                </div>

                <SummaryForm />
            </div>
             
        </div>
    )
}