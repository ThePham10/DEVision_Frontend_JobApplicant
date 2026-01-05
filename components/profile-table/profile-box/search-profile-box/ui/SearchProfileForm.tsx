"use client"

import { HeadlessForm } from "@/components/headless-form/Form"
import { LockKeyhole } from "lucide-react"
import useSearchProfileForm from "../hook/SearchProfileFormHook"

const SearchProfileForm = () => {
    const {
        isPremium,
        router,
        formConfig,
        handleSubmit
    } = useSearchProfileForm();

	return (
        <div className="space-y-4">
            {/* Premium banner for non-premium users */}
            {!isPremium && (
                <div className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                            <LockKeyhole className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Premium Feature</h4>
                            <p className="text-xs text-gray-600">
                                Unlock Search Profile to find candidates faster
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.push("/premium")}
                        className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow-md">
                        Upgrade
                    </button>
                </div>
            )}
            
            {/* Form container */}
            <div className={`relative ${!isPremium ? "rounded-xl overflow-hidden" : ""}`}>
                {/* Disabled overlay for non-premium */}
                {!isPremium && (
                    <div className="absolute top-2 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-full">
                        <LockKeyhole className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Locked</span>
                    </div>
                )}
                
                {/* Form - grayscale and reduced opacity when locked */}
                <div className={!isPremium ? "pointer-events-none select-none opacity-60 grayscale-[30%]" : ""}>
                    <HeadlessForm config={formConfig} onSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
	)
}

export default SearchProfileForm