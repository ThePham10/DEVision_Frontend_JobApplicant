"use client";

import Header from "@/components/header/ui/header";
import { useAuthStore } from "@/store/authStore";
import { AuthGuard } from "@/components/auth-guard/authGuard";

export default function Page() {
    const { user } = useAuthStore();

    return (
        <AuthGuard>
            <Header />

            <div className="flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-6 sm:p-10 gap-4 sm:gap-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                <p>Welcome to your dashboard!</p>
                <div>
                    {user?.email}
                </div>
            </div>
        </AuthGuard>
    )
}