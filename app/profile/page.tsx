"use client";

import Header from "@/components/header/ui/header";
import { ProfileTable } from "@/components/profile-table/ProfileTable";
import { useAuthStore } from "@/store/authStore";

export default function Page() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) return null;
    
    return (
        <> 
            <Header />
            {isAuthenticated && 
                <div className="flex flex-col gap-4 mt-4 ml-40 mr-40">
                    <div className="text-3xl font-bold text-foreground mb-8">Profile Management</div>
                    <ProfileTable />
                </div>
            }
        </>
    )
}