import { HeadlessForm } from "@/components/headless-form"
import { useAuthStore } from "@/store/authStore";
import { useSummaryBox } from "../hook/SummaryBoxHook";
import { useUserProfile } from "@/hooks/useUserProfile";

export const SummaryBox = () => {
    // Auth store
    const { isAuthenticated, user, userProfile } = useAuthStore();

    // Use user profile hook
    useUserProfile();

    // Use summary box hook
    const { handleSubmit, formConfig } = useSummaryBox();

    // Check authentication
    if (!isAuthenticated || !user) return null;

    return (
        <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
                <h2 className="font-[Inter] text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                    Objective Summary
                </h2>
                <HeadlessForm config={formConfig} initialValues={userProfile ? { objectiveSummary: userProfile.objectiveSummary } : undefined} onSubmit={(data) => handleSubmit(typeof data.objectiveSummary === 'string' ? data.objectiveSummary : undefined)}/>
            </div>
        </div>
    )
}